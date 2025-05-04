import { useEffect, useState } from 'react';
import Standing from "../components/Standing";
import Header from "../components/Header";
import Matches from '../components/Matches';
import axios from 'axios';

const Stats = () => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  const [teamsError, setTeamsError] = useState(null);
  const [matchesError, setMatchesError] = useState(null);

  const [teamsLoading, setTeamsLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${API_URL}/teams`);
        setTeams(res.data);
      } catch (err) {
        setTeamsError(err.response?.data?.message || 'Failed to fetch teams');
      } finally {
        setTeamsLoading(false);
      }
    };

    const fetchMatches = async () => {
      try {
        const res = await axios.get(`${API_URL}/matches`);
        setMatches(res.data);
      } catch (err) {
        setMatchesError(err.response?.data?.message || 'Failed to fetch matches');
      } finally {
        setMatchesLoading(false);
      }
    };

    fetchTeams();
    fetchMatches();
  }, [API_URL]);

  return (
    <>
      <Header />
      <div className="bg-secondary min-h-screen py-8 px-4 md:px-[10%]">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4">
            <div>
              {teamsLoading ? (
                <p className="text-white">Loading teams...</p>
              ) : teamsError ? (
                <p className="text-red-400">Error: {teamsError}</p>
              ) : (
                <Standing teams={teams} />
              )}
            </div>
            <div>
              {matchesLoading ? (
                <p className="text-white">Loading matches...</p>
              ) : matchesError ? (
                <p className="text-red-400">Error: {matchesError}</p>
              ) : (
                <Matches matches={matches} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
