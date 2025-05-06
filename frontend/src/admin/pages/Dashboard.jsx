import { useState, useEffect } from "react";
import { SportsSoccer, Group } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import StatsCard from '../components/StatsCard';
import Card from '../components/Card';
import TopScorer from "../components/TopScorer";
import Standing from "../components/Standing";
import Matches from "../components/Matches";

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch teams data using the API URL
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/teams`);
      setTeams(res.data);
    } catch (err) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };


  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/matches`);
      setMatches(res.data);
    } catch (err) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchMatches()
  }, []);

  if (loading) return <div className="text-center text-white py-8">Loading teams...</div>;
  if (error) return <div className="text-center text-white py-8">Error: {error}</div>;

  const topscorer = [...teams].sort((a, b) => (b.GF + b.KOGF) - (a.GF + a.KOGF));
  const sortedTeams = teams
    .map(team => ({ ...team, pts: (team.wins * 3) + team.draws }))
    .sort((a, b) => b.pts - a.pts || (b.GF + b.KOGF) - (a.GF + a.KOGF));

  const goals = teams.reduce((acc, curr) => acc + curr.GF + curr.KOGF, 0);
  const matchesPlayed = matches.filter(match => match.played === 1).length
  const totalTeams = teams.length;

  return (
    <>
      <h1 className="text-3xl">Welcome {JSON.parse(localStorage.getItem('user')).name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
        <StatsCard label="Total Goals" value={goals} icon={<SportsSoccer fontSize="large" className="text-primary" />} />
        <StatsCard label="Total Teams" value={totalTeams} icon={<Group fontSize="large" className="text-primary" />} />
        <StatsCard label="Matches Played" value={matchesPlayed} icon={<SportsSoccer fontSize="large" className="text-primary" />} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        <Card title="Top Scorer">
          <TopScorer teams={topscorer} />
        </Card>
        <Card title="Standing">
          <Standing teams={sortedTeams} />
        </Card>
        <Card title='Matches'>
          <Matches matches={matches}/>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
