import { useState, useEffect } from "react";
import axios from "axios";
import { Add, Edit, Delete } from "@mui/icons-material";
import PopUpWindow from "../components/PopUpWindow";
import { useNavigate } from "react-router-dom";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTeam, setCurrentTeam] = useState({ teamName: '', phoneNum: '', userName: '' });
    const [statusMsg, setStatusMsg] = useState('');
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    // Function to verify session before performing any action
    const verifySession = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return false; 
        }

        try {
            const res = await axios.post('https://efootball25-api.vercel.app/verify-session', {
                id: user.id,
                sessionCode: user.sessionCode
            });
            const { id_session, role } = res.data;
            if (id_session === user.sessionCode && role === 'admin') {
                return true;
            } else {
                setStatusMsg('You do not have the necessary permissions.');
                setStatus(false);
                return false; 
            }
        } catch (err) {
            console.error(err);
            navigate('/login');
            return false;
        }
    };

    // Fetch all teams
    const fetchTeams = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://efootball25-api.vercel.app/teams');
            setTeams(res.data);
        } catch (err) {
            setError('Failed to fetch teams');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
        setIsEditing(false);
        setCurrentTeam({ teamName: '', phoneNum: '', userName: '' });
        setStatusMsg('');
    };

    const handleOpenAddPopup = () => {
        setShowPopup(true);
        setIsEditing(false);
        setCurrentTeam({ teamName: '', phoneNum: '', userName: '' });
    }

    const handleOpenEditPopup = (team) => {
        setShowPopup(true);
        setIsEditing(true);
        setCurrentTeam({ teamName: team.teamName, phoneNum: team.phoneNum, userName: team.userName });
    }

    const handleDeleteTeam = async (userName) => {
        const sessionValid = await verifySession();
        if (!sessionValid) return; // Don't proceed if session is invalid

        if (confirm('Are you sure you want to delete this team?')) {
            try {
                await axios.delete(`https://efootball25-api.vercel.app/teams/${userName}`);
                setStatusMsg('Team deleted successfully!');
                setStatus(true);
                fetchTeams();
            } catch (err) {
                console.error(err);
                setStatusMsg('Failed to delete team');
                setStatus(false);
            }
        }
    };

    const handleSubmitTeam = async (e) => {
        e.preventDefault();

        const { teamName, phoneNum, userName } = currentTeam;
        if (!teamName || !phoneNum || !userName) {
            setStatusMsg('Please fill in all fields');
            setStatus(false);
            return;
        }

        const sessionValid = await verifySession();
        if (!sessionValid) return; // Don't proceed if session is invalid

        try {
            let response;
            if (isEditing) {
                response = await axios.post(`https://efootball25-api.vercel.app/teams/${userName}`, { teamName, phoneNum, userName });
                setStatusMsg('Team updated successfully!');
            } else {
                response = await axios.post('https://efootball25-api.vercel.app/register', { teamName, phoneNum, userName });
                setStatusMsg('Team added successfully!');
            }
            setStatus(true);
            fetchTeams();
            setTimeout(handleClosePopup, 1500);
        } catch (err) {
            setStatusMsg(err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'add'} team`);
            setStatus(false);
        }
    };

    if (loading) return <div className="text-center py-8">Loading teams...</div>;
    if (error) return <div className="text-center py-8">Error: {error}</div>;

    return (
        <>
            {showPopup && (
                <PopUpWindow onClose={handleClosePopup} title={isEditing ? 'Edit Team' : 'Add New Team'}>
                    <form onSubmit={handleSubmitTeam}>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1">Team Name</label>
                                <input 
                                    type='text' 
                                    name="teamName"
                                    value={currentTeam.teamName}
                                    onChange={(e) => setCurrentTeam({ ...currentTeam, teamName: e.target.value })}
                                    className='login-inp w-full' 
                                    placeholder="Team name"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">User Name</label>
                                <input 
                                    type='text' 
                                    name="userName"
                                    value={currentTeam.userName}
                                    onChange={(e) => setCurrentTeam({ ...currentTeam, userName: e.target.value })}
                                    className='login-inp w-full' 
                                    placeholder="User name"
                                    disabled={isEditing} // Disable editing of username as it's likely the primary key
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Phone Number</label>
                                <input 
                                    type='tel' 
                                    name="phoneNum"
                                    value={currentTeam.phoneNum}
                                    onChange={(e) => setCurrentTeam({ ...currentTeam, phoneNum: e.target.value })}
                                    className='login-inp w-full' 
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
                                    className='bg-primary/10 text-primary py-2 px-6 rounded cursor-pointer flex items-center' 
                                    onClick={handleClosePopup}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className='bg-primary py-2 px-6 rounded text-white cursor-pointer flex items-center hover:bg-primary-dark'
                                >
                                    {isEditing ? 'Update Team' : 'Add Team'}
                                </button>
                            </div>
                        </div>
                    </form>
                </PopUpWindow>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-3xl">Team Management</h1>
                <button 
                    className="bg-primary py-2 px-4 rounded text-white cursor-pointer flex items-center hover:bg-primary-dark"
                    onClick={handleOpenAddPopup}
                >
                    <Add className="mr-1"/>Add New team
                </button>
            </div>

            {statusMsg && !showPopup && (
                <div className={`p-2 rounded mt-4 ${status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {statusMsg}
                </div>
            )}

            <table className="dashb-table mt-6">
                <thead>
                    <tr>
                        <td>Actions</td>
                        <td>UserName</td>
                        <td>TeamName</td>
                        <td>Phone Number</td>
                        <td>W</td>
                        <td>L</td>
                        <td>D</td>
                        <td>GF</td>
                        <td>GA</td>
                        <td>KOGF</td>
                        <td>KOGA</td>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.userName}>
                            <td className="flex gap-2">
                                <button 
                                    onClick={() => handleOpenEditPopup(team)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <Edit fontSize="small" />
                                </button>
                                <button 
                                    onClick={() => handleDeleteTeam(team.userName)}
                                    className="text-red-500"
                                >
                                    <Delete fontSize="small" />
                                </button>
                            </td>
                            <td>{team.userName}</td>
                            <td>{team.teamName}</td>
                            <td>{team.phoneNum}</td>
                            <td>{team.wins}</td>
                            <td>{team.losses}</td>
                            <td>{team.draws}</td>
                            <td>{team.GF}</td>
                            <td>{team.GA}</td>
                            <td>{team.KOGF}</td>
                            <td>{team.KOGA}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Teams;
