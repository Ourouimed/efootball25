import { Edit, SportsSoccer , List } from "@mui/icons-material";
import PopUpWindow from "../components/PopUpWindow";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SettingsContext } from "../../contexts/SettingsContext";
import { exportAsCsv } from "../../utils/exportAsCsv";

const Matches = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDrawPopup, setShowDrawPopup] = useState(false);
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [updatingMatch, setUpdatingMatch] = useState(false);
  const [generatingMatches, setGeneratingMatches] = useState(false);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [currentRound, setCurrentRound] = useState("ALL");
  const [statusMsg, setStatusMsg] = useState("");
  const [status, setStatus] = useState(true);
  const [drawRound, setDrawRound] = useState("LP");

  const navigate = useNavigate();
  const { settings } = useContext(SettingsContext);

  const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';

  // build rounds
  let gwRounds = [];
  for (let i = 0; i < settings.totalGws; i++) {
    gwRounds.push(`GW${i + 1}`);
  }
  const rounds = [...gwRounds, "PO", "R16", "QF", "SF", "Final"];

  // Verify session
  const verifySession = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/verify-session`,
        {},
        { withCredentials: true }
      );
      const { role } = res.data;
      if (role !== "admin") {
        setStatusMsg("You do not have the necessary permissions.");
        setStatus(false);
        return false;
      }
      return true;
    } catch {
      navigate("/login");
      return false;
    }
  };

  // Start draw
  const handleStartDraw = async () => {
    const sessionValid = await verifySession();
    if (!sessionValid) return;

    setGeneratingMatches(true);
    try {
      let a = await axios.post(`${API_URL}/generate-matches`, {
        round: drawRound,
      });
      console.log(a.data);
      fetchMatches();
      setStatusMsg("Matches generated successfully.");
      setStatus(true);
    } catch (err) {
      console.log(err);
      setStatusMsg("Failed to generate matches.");
      setStatus(false);
    } finally {
      setGeneratingMatches(false);
    }
  };

  // Close popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedMatch(null);
    setStatusMsg("");
  };

  // Edit match popup
  const handleEditMatch = (match) => {
    setSelectedMatch(match);
    setHomeScore(match.home_score);
    setAwayScore(match.away_score);
    setShowPopup(true);
  };

  // Update match
  const handleUpdateMatch = async (e) => {
    e.preventDefault();
    const sessionValid = await verifySession();
    if (!sessionValid) return;

    setUpdatingMatch(true);
    try {
      let a = await axios.post(
        `${API_URL}/matches/update/${selectedMatch.id_match}`,
        {
          home_score: homeScore,
          away_score: awayScore,
        }
      );
      setStatusMsg(a.message);
      setStatus(true);
      fetchMatches();
      handleClosePopup();
    } catch (err) {
      setStatusMsg("Failed to update match.");
      setStatus(false);
    } finally {
      setUpdatingMatch(false);
    }
  };

  // Fetch matches
  const fetchMatches = async () => {
    setLoadingMatches(true);
    try {
      const res = await axios.get(`${API_URL}/matches`);
      setMatches(res.data);
    } catch (err) {
      setStatusMsg("Failed to fetch matches.");
      setStatus(false);
    } finally {
      setLoadingMatches(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const selectRound = (e) => {
    setCurrentRound(e.target.value);
  };

  const handleExportAsCsv = () => {
      exportAsCsv(matches)
  };

  return (
    <>
      {/* Match Edit Popup */}
      {showPopup && selectedMatch && (
        <PopUpWindow
          onClose={handleClosePopup}
          title={`Edit Match ${selectedMatch.id_match}`}
        >
          <form onSubmit={handleUpdateMatch} className="space-y-3">
            <div>
              {selectedMatch.round}
              <label className="block mb-1">Home Score</label>
              <input
                type="number"
                min={0}
                className="login-inp"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">Away Score</label>
              <input
                type="number"
                min={0}
                className="login-inp"
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
              />
            </div>
            {statusMsg && (
              <div
                className={`p-2 rounded ${
                  status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {statusMsg}
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updatingMatch}
                className={`cursor-pointer bg-primary py-2 px-4 rounded text-white flex items-center 
                  ${
                    updatingMatch
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary-dark"
                  }`}
              >
                {updatingMatch ? "Saving Match..." : "Save Score"}
              </button>
            </div>
          </form>
        </PopUpWindow>
      )}

      {/* Draw Confirmation Popup */}
      {showDrawPopup && (
        <PopUpWindow
          onClose={() => setShowDrawPopup(false)}
          title="Generate Matches"
        >
          <div className="space-y-4">
            <select
              className="select mb-1 w-full"
              onChange={(e) => {
                setDrawRound(e.target.value);
              }}
            >
              <option value="LP">League Phase</option>
              <option value="PO">Playoffs</option>
              <option value="R16">Round of 16</option>
              <option value="QF">Quarter Final</option>
              <option value="SF">Semi Final</option>
            </select>
            <p>Are you sure you want to generate matches?</p>
            {statusMsg && (
              <div
                className={`p-2 rounded ${
                  status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {statusMsg}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDrawPopup(false)}
                className="cursor-pointer bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleStartDraw();
                  setShowDrawPopup(false);
                }}
                disabled={generatingMatches}
                className={`cursor-pointer bg-primary py-2 px-4 rounded text-white flex items-center 
                    ${
                        generatingMatches
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary-dark"
                    }`}
              >
                {generatingMatches ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </PopUpWindow>
      )}

      <div className="flex items-center justify-between flex-col md:flex-row gap-1">
        <h1 className="text-2xl md:text-3xl">Match Management</h1>
        <div className="flex items-center gap-2 flex-col md:flex-row w-full md:w-auto">
          <select
            className="w-full md:w-auto select w-auto"
            onChange={selectRound}
          >
            <option value="ALL">All matches</option>
            {rounds.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button 
                    onClick={handleExportAsCsv}
                    className="bg-blue-500 py-2 px-4 rounded text-white flex items-center hover:bg-blue-600 cursor-pointer">
                        Export matches <List/>
          </button>
          <button
            disabled={generatingMatches}
            className={`justify-center w-full md:w-auto bg-green-500 py-2 px-4 rounded text-white cursor-pointer flex items-center 
              ${
                generatingMatches
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary-dark"
              }`}
            onClick={() => setShowDrawPopup(true)}
          >
            <SportsSoccer className="mr-1" />
            Start Draw
          </button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-2 mt-4 rounded ${
            status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {statusMsg}
        </div>
      )}

      {loadingMatches ? (
        <div className="text-center py-8">Loading matches...</div>
      ) : (
        <div className="dashb-table-wrapper mt-6">
          <table className="dashb-table">
            <thead>
              <tr>
                <th>id_match</th>
                <th>home_team</th>
                <th>away_team</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(currentRound === "ALL"
                ? matches
                : matches.filter((match) => match.round === currentRound)
              ).map((match) => (
                <tr key={match.id_match}>
                  <td>{match.id_match}</td>
                  <td>{match.hometeam_name}</td>
                  <td>{match.awayteam_name}</td>
                  <td>
                    {match.home_score} - {match.away_score}
                  </td>
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
        </div>
      )}
    </>
  );
};

export default Matches;
