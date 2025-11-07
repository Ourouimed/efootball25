import { useState, useEffect } from "react";
import axios from "axios";
import { Add, Edit, Delete, ErrorOutline , List } from "@mui/icons-material";
import PopUpWindow from "../components/PopUpWindow";
import { useNavigate } from "react-router-dom";
import { exportAsCsv } from '../../utils/exportAsCsv'

const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSanctionsPopup, setShowSanctionsPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentTeam, setCurrentTeam] = useState({ teamName: '', phoneNum: '', userName: '' });
  const [currentSanction, setCurrentSanction] = useState({ teamUserName: '', points: '' });
  const [statusMsg, setStatusMsg] = useState('');
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();


  const verifySession = async () => {
    try {
      const res = await axios.post(`${API_URL}/verify-session`);
      const { role } = res.data;
      if (role !== 'admin') {
        setStatusMsg('You do not have the necessary permissions.');
        setStatus(false);
        return false;
      }
      return true;
    } catch {
      navigate('/login');
      return false;
    }
  };
  
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/teams`);
      setTeams(res.data);
    } catch {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleOpenAddPopup = () => {
    setShowPopup(true);
    setIsEditing(false);
    setCurrentTeam({ teamName: '', phoneNum: '', userName: '' });
    setStatusMsg('');
  };
  const handleOpenEditPopup = (team) => {
    setShowPopup(true);
    setIsEditing(true);
    setCurrentTeam({ teamName: team.teamName, phoneNum: team.phoneNum, userName: team.userName });
    setStatusMsg('');
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setIsEditing(false);
    setCurrentTeam({ teamName: '', phoneNum: '', userName: '' });
    setStatusMsg('');
  };

  const handleOpenSanctionsPopup = (team = null) => {
    setShowSanctionsPopup(true);
    setCurrentSanction({
      teamUserName: team?.userName ?? '',
      points: ''
    });
    setStatusMsg('');
  };
  const handleCloseSanctionsPopup = () => {
    setShowSanctionsPopup(false);
    setCurrentSanction({ teamUserName: '', points: '' });
    setStatusMsg('');
  };

  const handleDeleteTeam = async (userName) => {
    if (!await verifySession()) return;
    if (!confirm('Are you sure you want to delete this team?')) return;
    try {
      await axios.delete(`${API_URL}/teams/delete/${userName}`);
      setTeams(prev => prev.filter(t => t.userName !== userName));
      setStatusMsg('Team deleted successfully!');
      setStatus(true);
    } catch {
      setStatusMsg('Failed to delete team');
      setStatus(false);
    }
  };

  const handleSubmitTeam = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { teamName, phoneNum, userName } = currentTeam;
    if (!teamName || !phoneNum || !userName) {
      setStatusMsg('Please fill in all fields');
      setStatus(false);
      setSubmitting(false);
      return;
    }
    if (teamName.length < 3) {
      setStatusMsg('Team name must be at least 3 characters long');
      setStatus(false);
      setSubmitting(false);
      return;
    }
    if (!/^\d{8,15}$/.test(phoneNum)) {
      setStatusMsg('Enter a valid phone number (8–15 digits)');
      setStatus(false);
      setSubmitting(false);
      return;
    }
    if (!await verifySession()) { setSubmitting(false); return; }

    try {
      if (isEditing) {
        await axios.post(`${API_URL}/teams/update/${userName}`, currentTeam);
        setTeams(prev => prev.map(t => t.userName === userName ? { ...t, ...currentTeam } : t));
        setStatusMsg('Team updated successfully!');
      } else {
        await axios.post(`${API_URL}/teams/register`, currentTeam);
        setTeams(prev => [...prev, currentTeam]);
        setStatusMsg('Team added successfully!');
      }
      setStatus(true);
      setTimeout(handleClosePopup, 1000);
    } catch (err) {
      setStatusMsg(err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'add'} team`);
      setStatus(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitSanction = async (e) => {
    e.preventDefault();
    const { teamUserName, points } = currentSanction;
    if (!teamUserName || points === '') {
      setStatusMsg('Please select a team and enter points to remove');
      setStatus(false);
      return;
    }
    if (!/^\d+$/.test(points) || Number(points) <= 0) {
      setStatusMsg('Points must be a positive number');
      setStatus(false);
      return;
    }
    if (!await verifySession()) return;

    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/teams/sanction/${teamUserName}`, { points: Number(points) });
      
      setStatusMsg('Sanction applied successfully!');
      setStatus(true);
      setTimeout(handleCloseSanctionsPopup, 1000);
    } catch (err) {
      setStatusMsg(err.response?.data?.message || 'Failed to apply sanction');
      setStatus(false);
    } finally {
      setSubmitting(false);
    }
  };


  const handleExportAsCsv = () => {
    exportAsCsv(teams)
  };

  if (loading) return <div className="text-center py-8">Loading teams...</div>;
  if (error) return <div className="text-center py-8">Error: {error}</div>;

  return (
    <>
      {showSanctionsPopup && (
        <PopUpWindow onClose={handleCloseSanctionsPopup} title="Add Sanction">
          <form onSubmit={handleSubmitSanction} className="space-y-4">
            <div>
              <label>Team</label>
              <select
                className="login-inp w-full"
                value={currentSanction.teamUserName}
                onChange={e => setCurrentSanction({ ...currentSanction, teamUserName: e.target.value })}
              >
                <option value="">-- Choose team --</option>
                {teams.map(team => (
                  <option key={team.userName} value={team.userName}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Points to remove</label>
              <input
                type="number"
                className="login-inp w-full"
                value={currentSanction.points}
                onChange={e => setCurrentSanction({ ...currentSanction, points: e.target.value })}
                min="1"
              />
            </div>
            {statusMsg && (
              <div className={`p-2 rounded ${status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {statusMsg}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={handleCloseSanctionsPopup} className="bg-primary/10 text-primary py-2 px-6 rounded">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">
                {submitting ? 'Processing...' : 'Apply Sanction'}
              </button>
            </div>
          </form>
        </PopUpWindow>
      )}

      {showPopup && (
        <PopUpWindow onClose={handleClosePopup} title={isEditing ? 'Edit Team' : 'Add New Team'}>
        <form onSubmit={handleSubmitTeam}>
            <div className="space-y-4">
                <div>
                    <label className="block mb-1">Team Name</label>
                    <input
                        type="text"
                        value={currentTeam.teamName}
                        onChange={(e) => setCurrentTeam({ ...currentTeam, teamName: e.target.value })}
                        className="login-inp w-full"
                        placeholder="Team name"
                    />
                </div>
                <div>
                    <label className="block mb-1">User Name</label>
                    <input
                        type="text"
                        value={currentTeam.userName}
                        onChange={(e) => setCurrentTeam({ ...currentTeam, userName: e.target.value })}
                        className="login-inp w-full"
                        placeholder="User name"
                        disabled={isEditing}
                    />
                </div>
                <div>
                    <label className="block mb-1">Phone Number</label>
                    <input
                        type="tel"
                        value={currentTeam.phoneNum}
                        onChange={(e) => setCurrentTeam({ ...currentTeam, phoneNum: e.target.value })}
                        className="login-inp w-full"
                        placeholder="Phone number"
                    />
                </div>

                {statusMsg && (
                    <div className={`p-2 rounded ${status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {statusMsg}
                    </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        className="bg-primary/10 text-primary py-2 px-6 rounded cursor-pointer"
                        onClick={handleClosePopup}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="cursor-pointer  bg-primary py-2 px-6 rounded text-white hover:bg-primary-dark disabled:opacity-50"
                        disabled={submitting}
                    >
                        {submitting ? 'Processing...' : isEditing ? 'Update Team' : 'Add Team'}
                    </button>
                </div>
            </div>
        </form>
    </PopUpWindow>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl">Team Management</h1>
        <div className="flex items-center gap-3">
          <button 
          onClick={handleExportAsCsv}
          className="bg-blue-500 py-2 px-4 rounded text-white flex items-center hover:bg-blue-600 cursor-pointer">
              Export teams <List/>
          </button>
          <button
            className="bg-red-500 py-2 px-4 rounded text-white flex items-center hover:bg-red-600 cursor-pointer"
            onClick={() => handleOpenSanctionsPopup()}
          >
            <ErrorOutline className="mr-1"/> Add sanction
          </button>
          <button
            className="bg-primary py-2 px-4 rounded text-white flex items-center hover:bg-primary-dark cursor-pointer"
            onClick={handleOpenAddPopup}
          >
            <Add className="mr-1"/> Add New Team
          </button>
        </div>
      </div>

      {statusMsg && !showPopup && !showSanctionsPopup && (
        <div className={`p-2 rounded mt-4 ${status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {statusMsg}
        </div>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="dashb-table min-w-full">
          <thead>
            <tr>
              <td>Actions</td><td>UserName</td><td>TeamName</td><td>Phone Number</td>
              <td>W</td><td>L</td><td>D</td><td>GF</td><td>GA</td><td>KOGF</td><td>KOGA</td><td>Sanctions</td>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.userName}>
                <td className="flex gap-2">
                  <button onClick={() => handleOpenEditPopup(team)} className="text-blue-500 hover:text-blue-700">
                    <Edit fontSize="small"/>
                  </button>
                  <button onClick={() => handleDeleteTeam(team.userName)} className="text-red-500">
                    <Delete fontSize="small"/>
                  </button>
                  <button onClick={() => handleOpenSanctionsPopup(team)} className="text-orange-500">
                    <ErrorOutline fontSize="small"/>
                  </button>
                </td>
                <td>{team.userName}</td><td>{team.teamName}</td><td>{team.phoneNum}</td>
                <td>{team.wins}</td><td>{team.losses}</td><td>{team.draws}</td>
                <td>{team.GF}</td><td>{team.GA}</td><td>{team.KOGF}</td><td>{team.KOGA}</td>
                <td>{team.pointsDeducted || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Teams;
