import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { useState } from "react";

const Matches = ({ matches, teams }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState("ALL");

  const rounds = [
    "GW1", "GW2", "GW3", "GW4", "GW5", "GW6", "GW7", "GW8",
    "PO", "R16", "QF", "SF", "Final"
  ];

  const nextGw = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound((prev) => prev + 1);
    }
  };

  const prevGw = () => {
    if (currentRound > 0) {
                                        setCurrentRound((prev) => prev - 1);
    }
  };

  const currentRoundName = rounds[currentRound];

  const displayedMatches =
    selectedTeam === "ALL"
      ? matches.filter((match) => match.round === currentRoundName)
      : matches.filter(
          (match) =>
            (match.home_team === selectedTeam ||
              match.away_team === selectedTeam)
        );

  const NavBtnsStyle =
    "bg-primary disabled:bg-primary/10 cursor-pointer flex items-center justify-center rounded text-white size-[30px]";

  return <>
    
      <select
        onChange={(e) => setSelectedTeam(e.target.value)}
        value={selectedTeam}
        className="w-full select mb-1"
      >
        <option value="ALL">ALL</option>
        {teams.map((team) => (
          <option key={team.userName} value={team.userName}>
            {team.teamName}
          </option>
        ))}
      </select>

      {selectedTeam === "ALL" && (
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={prevGw}
            disabled={currentRound === 0}
            className={NavBtnsStyle}
          >
            <ChevronLeftRounded />
          </button>
          <span className="font-semibold text-sm">
            {currentRoundName}
          </span>
          <button
            onClick={nextGw}
            disabled={currentRound === rounds.length - 1}
            className={NavBtnsStyle}
          >
            <ChevronRightRounded />
          </button>
        </div>
      )}

      {displayedMatches.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No matches found.
        </div>
      ) : (
        displayedMatches.map((match) => (
          <div
            key={match.id_match}
            className="match flex justify-between items-center py-2 border-b"
          >
            <div className="flex-1 text-center text-sm">
              {match.hometeam_name}
            </div>
            <div
              className={`text-center rounded py-1 px-4 ${
                match.home_score === null || match.away_score === null
                  ? ""
                  : "bg-third text-white"
              }`}
            >
              {match.home_score} - {match.away_score}
            </div>
            <div className="flex-1 text-center text-sm">
              {match.awayteam_name}
            </div>
          </div>
        ))
      )}
  </>
};


export default Matches;
