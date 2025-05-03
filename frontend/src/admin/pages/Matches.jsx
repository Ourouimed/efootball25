import { Edit, SportsSoccer } from "@mui/icons-material";
import PopUpWindow from "../components/PopUpWindow";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Matches = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [homeScore, setHomeScore] = useState('');
    const [awayScore, setAwayScore] = useState('');
    const [currentRound, setCurrentRound] = useState('ALL');
    const [statusMsg, setStatusMsg] = useState('');
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    const verifySession = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return false;
        }

        try {
            const res = await axios.post('http://localhost:3001/verify-session', {
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
            setStatusMsg('Session verification failed.');
            setStatus(false);
            return false;
        }
    };

    const handleStartDraw = async () => {
        const sessionValid = await verifySession();
        if (!sessionValid) return;

        try {
            await axios.post('http://localhost:3001/generate-matches');
            fetchMatches();
            setStatusMsg('Matches generated successfully.');
            setStatus(true);
        } catch (err) {
            setStatusMsg('Failed to generate matches.');
            setStatus(false);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedMatch(null);
        setStatusMsg('');
    };

    const handleEditMatch = (match) => {
        setSelectedMatch(match);
        setHomeScore(match.home_score);
        setAwayScore(match.away_score);
        setShowPopup(true);
    };

    const handleUpdateMatch = async (e) => {
        e.preventDefault();
        const sessionValid = await verifySession();
        if (!sessionValid) return;

        try {
            await axios.post(`http://localhost:3001/matches/${selectedMatch.id_match}`, {
                home_score: homeScore,
                away_score: awayScore
            });
            setStatusMsg('Match updated successfully.');
            setStatus(true);
            fetchMatches();
            handleClosePopup();
        } catch (err) {
            setStatusMsg('Failed to update match.');
            setStatus(false);
        }
    };

    const fetchMatches = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3001/matches');
            setMatches(res.data);
        } catch (err) {
            setStatusMsg('Failed to fetch matches.');
            setStatus(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    const selectRound = (e) => {
        setCurrentRound(e.target.value);
    };

    if (loading) return <div className="text-center py-8">Loading matches...</div>;

    return (
        <>
            {showPopup && selectedMatch && (
                <PopUpWindow onClose={handleClosePopup} title={`Edit Match ${selectedMatch.id_match}`}>
                    <form onSubmit={handleUpdateMatch} className="space-y-3">
                        <div>
                            <label className="block mb-1">Home Score</label>
                            <input
                                type="number"
                                className="login-inp"
                                value={homeScore}
                                onChange={(e) => setHomeScore(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Away Score</label>
                            <input
                                type="number"
                                className="login-inp"
                                value={awayScore}
                                onChange={(e) => setAwayScore(e.target.value)}
                            />
                        </div>
                        {statusMsg && (
                            <div className={`p-2 rounded ${status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {statusMsg}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-primary py-2 px-4 rounded text-white cursor-pointer flex items-center hover:bg-primary-dark"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </PopUpWindow>
            )}

            <div className="flex items-center justify-between flex-col md:flex-row gap-1">
                <h1 className="text-2xl md:text-3xl">Match Management</h1>
                <div className="flex items-center gap-2 flex-col md:flex-row w-full md:w-auto">
                    <select className="w-full md:w-auto select w-auto" onChange={selectRound}>
                        <option value="ALL">All matches</option>
                        {[...Array(8)].map((_, i) => (
                            <option key={i} value={`GW${i + 1}`}>Gameweek {i + 1}</option>
                        ))}
                    </select>
                    <button
                        className="justify-center w-full md:w-auto bg-green-500 py-2 px-4 rounded text-white cursor-pointer flex items-center hover:bg-primary-dark"
                        onClick={handleStartDraw}
                    >
                        <SportsSoccer className="mr-1" />Generate Draw
                    </button>
                </div>
            </div>

            {statusMsg && (
                <div className={`p-2 mt-4 rounded ${status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {statusMsg}
                </div>
            )}

            <table className="dashb-table mt-6">
                <thead>
                    <tr>
                        <td>id_match</td>
                        <td>home_team</td>
                        <td>away_team</td>
                        <td>Score</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {(currentRound === 'ALL' ? matches : matches.filter(match => match.round === currentRound)).map(match => (
                        <tr key={match.id_match}>
                            <td>{match.id_match}</td>
                            <td>{match.hometeam_name}</td>
                            <td>{match.awayteam_name}</td>
                            <td>{match.home_score} - {match.away_score}</td>
                            <td>
                                <button
                                    onClick={() => handleEditMatch(match)}
                                    className="text-blue-500 hover:underline"
                                >
                                    <Edit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Matches;
