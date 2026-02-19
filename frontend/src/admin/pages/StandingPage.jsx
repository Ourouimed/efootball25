import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Search, ErrorOutline } from "@mui/icons-material";
import PopUpWindow from "../components/PopUpWindow";

const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';

const StandingsPage = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sanction states
  const [showSanctionsPopup, setShowSanctionsPopup] = useState(false);
  const [currentSanction, setCurrentSanction] = useState({ id_team: '', teamName: '', points: '' });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [status, setStatus] = useState(true);

  const fetchStandings = async () => {
    try {
      const res = await axios.get(`${API_URL}/teams/standings`);
      setStandings(res.data);
    } catch (err) {
      setError("Failed to load standings table.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  // Filter and Sort Logic
  const filteredAndSortedData = useMemo(() => {
    // 1. Filter by search query
    let data = standings.filter(team => 
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sort by Points, then GD, then GF
    return data.sort((a, b) => {
      const ptsA = (a.wins * 3) + a.draws - a.sanction;
      const ptsB = (b.wins * 3) + b.draws - b.sanction;
      if (ptsB !== ptsA) return ptsB - ptsA;

      const gdA = (a.GF + a.KOGF) - (a.GA + a.KOGA);
      const gdB = (b.GF + b.KOGF) - (b.GA + b.KOGA);
      if (gdB !== gdA) return gdB - gdA;

      return (b.GF + b.KOGF) - (a.GF + a.KOGF);
    });
  }, [standings, searchQuery]);

  const handleOpenSanctionsPopup = (team) => {
    setShowSanctionsPopup(true);
    setCurrentSanction({ id_team: team.id_team, teamName: team.teamName, points: '' });
    setStatusMsg('');
  };

  const handleSubmitSanction = async (e) => {
    e.preventDefault();
    if (!currentSanction.points || currentSanction.points <= 0) {
      setStatusMsg("Please enter valid points");
      setStatus(false);
      return;
    }

    setSubmitting(true);
    try {
      // Using id_team in the URL as requested
      await axios.post(`${API_URL}/teams/sanction/${currentSanction.id_team}`, { 
        points: Number(currentSanction.points) 
      });

      // Update local state for immediate UI feedback
      setStandings(prev => prev.map(t => 
        t.id_team === currentSanction.id_team 
        ? { ...t, sanction: t.sanction + Number(currentSanction.points) } 
        : t
      ));

      setStatusMsg("Sanction applied!");
      setStatus(true);
      setTimeout(() => setShowSanctionsPopup(false), 1000);
    } catch (err) {
      setStatusMsg("Failed to apply sanction");
      setStatus(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading Standings...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      {showSanctionsPopup && (
        <PopUpWindow onClose={() => setShowSanctionsPopup(false)} title={`Penalty: ${currentSanction.teamName}`}>
          <form onSubmit={handleSubmitSanction} className="space-y-4">
            <div>
              <label className="block mb-1">Points to deduct</label>
              <input
                type="number"
                className="login-inp w-full"
                value={currentSanction.points}
                onChange={(e) => setCurrentSanction({ ...currentSanction, points: e.target.value })}
                placeholder="Enter points (e.g. 3)"
                autoFocus
              />
            </div>
            {statusMsg && (
              <div className={`p-2 rounded ${status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {statusMsg}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowSanctionsPopup(false)} className="bg-gray-100 px-4 py-2 rounded cursor-pointer">Cancel</button>
              <button type="submit" disabled={submitting} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded">
                {submitting ? 'Processing...' : 'Apply Sanction'}
              </button>
            </div>
          </form>
        </PopUpWindow>
      )}

      <div className="flex flex-col md:flex-row justify-between  md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Tournament Standings</h1>
        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 max-w-md focus-within:ring-2 focus-within:ring-primary/50">
        <Search className="text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search by team name..." 
          className="outline-none w-full bg-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      </div>

      <div className="dashb-table-wrapper mt-6">
        <table className="dashb-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>P</th><th>W</th><th>D</th><th>L</th>
              <th>GF</th><th>GA</th><th>GD</th>
              <th >Sanc</th>
              <th>PTS</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((team, index) => {
              const goalsFor = team.GF + team.KOGF;
              const goalsAgainst = team.GA + team.KOGA;
              const gd = goalsFor - goalsAgainst;
              const pts = (team.wins * 3) + team.draws - team.sanction;

              const rowClass = 
              index < 16 ? "best-8" : index < 48 ? "playoffs" : "";

              return (
                <tr key={team.id_team} className={`border-b hover:bg-gray-50 transition-colors ${rowClass}`}>
                  <td>{index + 1}</td>
                  <td>{team.teamName}</td>
                  <td>{team.wins + team.draws + team.losses}</td>
                  <td>{team.wins}</td>
                  <td>{team.draws}</td>
                  <td>{team.losses}</td>
                  <td>{goalsFor}</td>
                  <td>{goalsAgainst}</td>
                  <td className={gd > 0 ? "text-green-600" : gd < 0 ? "text-red-600" : ""}>
                    {gd > 0 ? `+${gd}` : gd}
                  </td>
                  <td className="text-red-400">-{team.sanction}</td>
                  <td className="bg-primary/5 font-bold text-primary">{pts}</td>
                  <td>
                    <button 
                      onClick={() => handleOpenSanctionsPopup(team)}
                      className="cursor-pointer p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Apply Penalty"
                    >
                      <ErrorOutline fontSize="small" />
                    </button>
                  </td>
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