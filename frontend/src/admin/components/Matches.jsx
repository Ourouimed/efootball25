import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { useState } from "react";
const Matches = ({matches})=>{
    const [currentRound, setCurrentRound] = useState(0);
    const nextGw = () => {
        if (currentRound < 7) {
        setCurrentRound(prev => prev + 1);
        }
    };

    const prevGw = () => {
        if (currentRound > 0) {
        setCurrentRound(prev => prev - 1);
        }
    };

    const filteredMatches = matches.filter(
        match => match.round === `GW${currentRound + 1}`
    );
    return <>
    <div className='p-2'>
    <div className="flex justify-between items-center pb-2">
        <button
          onClick={prevGw}
          className="bg-primary rounded text-white flex items-center justify-center cursor-pointer disabled:opacity-50"
          disabled={currentRound === 0}
        >
          <ChevronLeftRounded fontSize="large" />
        </button>
        <span>
          {currentRound < 8 ? `Gameweek ${currentRound + 1}` : "Playoffs"}
        </span>
        <button
          onClick={nextGw}
          className="bg-primary rounded text-white flex items-center justify-center cursor-pointer disabled:opacity-50"
          disabled={currentRound === 7}
        >
          <ChevronRightRounded fontSize="large" />
        </button>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No matches this week.
        </div>
      ) : (
        filteredMatches.map(match => (
          <div key={match.id_match} className="match">
            <div className="flex-1 text-center">{match.hometeam_name}</div>
            <div className="flex-1 text-center">
              {match.home_score} - {match.away_score}
            </div>
            <div className="flex-1 text-center">{match.awayteam_name}</div>
          </div>
        ))
      )}
    </div>
       
    </>
}

export default Matches