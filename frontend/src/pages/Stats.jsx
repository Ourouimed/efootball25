import { useEffect, useState } from 'react';
import Standing from "../components/Standing";
import Header from "../components/Header";
const Stats = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:3001/teams');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTeams(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) return <div className="text-center text-white py-8">Loading teams...</div>;
    if (error) return <div className="text-center text-white py-8">Error: {error}</div>;

    return <>
        <Header/>
        <div className="bg-secondary">
            <div className="container flex items-center justify-center min-h-screen flex-col ">
                <div className='grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-3'>
                    <Standing teams={teams} />
                </div>
            </div>
        </div>
    </>;
}

export default Stats;