import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';

const StandingsPage = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await axios.get(`${API_URL}/teams/standings`);
        // Sorting Logic: 
        // 1. Points (desc) 2. Goal Difference (desc) 3. Goals For (desc)
        const sortedData = res.data.sort((a, b) => {
          const pointsA = (a.wins * 3) + a.draws - a.sanction;
          const pointsB = (b.wins * 3) + b.draws - b.sanction;
          if (pointsB !== pointsA) return pointsB - pointsA;

          const gdA = (a.GF + a.KOGF) - (a.GA + a.KOGA);
          const gdB = (b.GF + b.KOGF) - (b.GA + b.KOGA);
          return gdB - gdA;
        });

        setStandings(sortedData);
      } catch (err) {
        setError("Failed to load standings table.");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) return <div className="text-center py-8">Loading Standings...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl">Tournament Standings</h1>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="dashb-table min-w-full text-center">
          <thead className="bg-gray-100 font-bold">
            <tr>
              <td className="px-4 py-2">Pos</td>
              <td className="text-left px-4">Team</td>
              <td>P</td><td>W</td><td>D</td><td>L</td>
              <td>GF</td><td>GA</td><td>GD</td>
              <td className="text-red-500">Sanc</td>
              <td className="bg-primary/10 text-primary font-black">PTS</td>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => {
              const goalsFor = team.GF + team.KOGF;
              const goalsAgainst = team.GA + team.KOGA;
              const gd = goalsFor - goalsAgainst;
              const pts = (team.wins * 3) + team.draws - team.sanction;
              const rowClass = index < 8 ? "best-8" : index < 24 ? "playoffs" : "";

              return (
                <tr key={team.id_team} className={`border-b hover:bg-gray-50 transition-colors ${rowClass}`}>
                  <td className="font-bold text-gray-500">{index + 1}</td>
                  <td className="text-left font-semibold px-4">{team.teamName}</td>
                  <td>{team.wins + team.draws + team.losses}</td>
                  <td>{team.wins}</td>
                  <td>{team.draws}</td>
                  <td>{team.losses}</td>
                  <td>{goalsFor}</td>
                  <td>{goalsAgainst}</td>
                  <td className={gd > 0 ? "text-green-600" : gd < 0 ? "text-red-600" : ""}>
                    {gd > 0 ? `+${gd}` : gd}
                  </td>
                  <td className="text-red-400">{team.sanction}</td>
                  <td className="bg-primary/5 font-bold text-primary">{pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsPage;