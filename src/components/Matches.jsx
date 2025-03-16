import matches from '../admin/matches'

const Matches=()=>{
  return (
        <div className="mt-3">
            {matches.map((gameweek, index) => (
                <div key={index}>
                    <h3>Gameweek {index + 1}</h3>
                    {gameweek.map((match, matchIndex) => (
                        <div key={matchIndex} className="card mb-2">
          <div className="card-header">
                                {match.teamA} vs {match.teamB}
          </div>
          <div className="card-body">
            <p className="card-text">Score: {match.score}</p>
          </div>
        </div>
      ))}
    </div>
            ))}
        </div>
  );
}

export default Matches;
