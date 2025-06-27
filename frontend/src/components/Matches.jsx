import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { useContext, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

const Matches = ({ matches, teams }) => {
  const {settings :{ currentRound , totalGws}} = useContext(SettingsContext)
  let gwRounds = []
  for (let i =0 ; i < totalGws ; i++){
    gwRounds.push(`GW${i+1}`)

  }
  const rounds = [
    ...gwRounds,
    "PO", "R16", "QF", "SF", "Final"
  ];
  const [currRound, setcurrRound] = useState(rounds.indexOf(currentRound));
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  
  

  


  const nextGw = () => {
    if (currRound < rounds.length - 1) {
      setcurrRound((prev) => prev + 1);
    }
  };

  const prevGw = () => {
    if (currRound > 0) {
          setcurrRound((prev) => prev - 1);
    }
  };

  const currRoundName = rounds[currRound];

  const displayedMatches =
    selectedTeam === "ALL"
      ? matches.filter((match) => match.round === currRoundName)
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
            disabled={currRound === 0}
            className={NavBtnsStyle}
          >
            <ChevronLeftRounded />
          </button>
          <span className="font-semibold text-sm">
            {currRoundName}
          </span>
          <button
            onClick={nextGw}
            disabled={currRound === rounds.length - 1}
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
