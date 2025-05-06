import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import HomeCard from "./HomeCard";
import { useState } from "react";

const Matches = ({ matches, teams }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState("ALL");

  const nextGw = () => {
    if (currentRound < 7) {
      setCurrentRound((prev) => prev + 1);
    }
  };

  const prevGw = () => {
    if (currentRound > 0) {
      setCurrentRound((prev) => prev - 1);
    }
  };

  const displayedMatches = matches.filter((match) => {
    const isCurrentRound = match.round === `GW${currentRound + 1}`;
    const isSelectedTeam =
      selectedTeam === "ALL" ||
      match.home_team === selectedTeam ||
      match.away_team === selectedTeam;
    return isCurrentRound && isSelectedTeam;
  });

  return (
    <HomeCard title="matches">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={prevGw}
          disabled={currentRound === 0}
          className="disabled:opacity-30"
        >
          <ChevronLeftRounded />
        </button>
        <span className="font-semibold text-sm">Gameweek {currentRound + 1}</span>
        <button
          onClick={nextGw}
          disabled={currentRound === 7}
          className="disabled:opacity-30"
        >
          <ChevronRightRounded />
        </button>
      </div>

      <select
        onChange={(e) => setSelectedTeam(e.target.value)}
        value={selectedTeam}
        className="w-full mb-3 p-1 rounded border"
      >
        <option value="ALL">ALL</option>
        {teams.map((team) => (
          <option key={team.userName} value={team.userName}>
            {team.teamName}
          </option>
        ))}
      </select>

      {displayedMatches.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No matches this week.
        </div>
      ) : (
        displayedMatches.map((match) => (
          <div key={match.id_match} className="match flex justify-between items-center py-2 border-b">
            <div className="flex-1 text-center text-sm">{match.hometeam_name}</div>
            <div
              className={`text-center rounded py-1 px-4 ${
                match.home_score === null || match.away_score === null
                  ? ""
                  : "bg-third text-white"
              }`}
            >
              {match.home_score} - {match.away_score}
            </div>
            <div className="flex-1 text-center text-sm">{match.awayteam_name}</div>
          </div>
        ))
      )}
    </HomeCard>
  );
};

export default Matches;
