import { useState, useEffect } from "react";
import axios from "axios";
import { Add } from "@mui/icons-material";
import PopUpWindow from "../components/PopUpWindow";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [newTeam, setNewTeam] = useState({
        teamName: '',
        phoneNum: '',
        userName: ''
    });
    const [statusMsg, setstatusMsg] = useState('');
    const [status, setStatus] = useState(true); 
    
    const fetchTeams = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3001/teams');
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
        setNewTeam({
            teamName: '',
            phoneNum: '',
            userName: ''
        });
        setstatusMsg('');
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeam(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddTeam = async (e) => {
        e.preventDefault();
        const { teamName, phoneNum, userName } = newTeam;
        
        if (!teamName || !phoneNum || !userName) {
            setstatusMsg('Please fill in all the required fields');
            setStatus(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/register', {
                teamName,
                phoneNum,
                userName,
            });
            setStatus(true);
            setstatusMsg('Team added successfully!');
            
            fetchTeams(); 
            setTimeout(() => {
                handleClosePopup();
            }, 1500);
        } catch (err) {
            console.error(err);
            setstatusMsg(err.response?.data?.message || 'Failed to add team');
            setStatus(false);
        }
    };

    if (loading) return <div className="text-center py-8">Loading teams...</div>;
    if (error) return <div className="text-center py-8">Error: {error}</div>;
    
    return (
        <>
            {showPopup && (
                <PopUpWindow onClose={handleClosePopup} title='Add New Team'>
                    <form onSubmit={handleAddTeam}>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1">Team Name</label>
                                <input 
                                    type='text' 
                                    name="teamName"
                                    value={newTeam.teamName}
                                    onChange={handleInputChange}
                                    className='login-inp w-full' 
                                    placeholder="Team name"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">User Name</label>
                                <input 
                                    type='text' 
                                    name="userName"
                                    value={newTeam.userName}
                                    onChange={handleInputChange}
                                    className='login-inp w-full' 
                                    placeholder="User name"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Phone Number</label>
                                <input 
                                    type='tel' 
                                    name="phoneNum"
                                    value={newTeam.phoneNum}
                                    onChange={handleInputChange}
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
                                    Add Team
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
                    onClick={handleOpenPopup}
                >
                    <Add className="mr-1"/>Add New team
                </button>
            </div>
            
            <table className="dashb-table mt-6">
                <thead>
                    <tr>
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
                            <td>{team.userName}</td>
                            <td>{team.teamName}</td>
                            <td>{team.phoneNum}</td>
                            <td>{team.wins}</td>
                            <td>{team.lowses}</td>
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