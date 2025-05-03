import { useEffect, useState } from 'react';
import Standing from "../components/Standing";
import Header from "../components/Header";
import Matches from '../components/Matches';
import axios from 'axios';
const Stats = () => {
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3001/teams');
                setTeams(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchTeams();
    }, []);
    
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://localhost:3001/matches');
                setMatches(response.data);
            } catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
    
        fetchMatches();
    }, []);
    

    if (loading) return <div className="text-center text-white py-8">Loading teams...</div>;
    if (error) return <div className="text-center text-white py-8">Error: {error}</div>;

    return (
        <>
          <Header />
          <div className="bg-secondary min-h-screen py-8 px-4 md:px-[10%]">
            <div className="max-w-screen-xl mx-auto flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4">
                <Standing teams={teams} />
                <Matches matches={matches} />
              </div>
            </div>
          </div>
        </>
      );
      
}

export default Stats;