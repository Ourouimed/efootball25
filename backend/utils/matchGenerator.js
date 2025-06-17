function generateLPmatches(teams, totalGws = 8) {
  const matches = [];
  const numTeams = teams.length;
  const matchesPerGw = numTeams / 2;

  for(let gw=1;gw <= totalGws ; gw++){
    if  (numTeams % 2 === 1){
      throw new Error('Number of teams must be even');
    }

    let teamsToDraw = [...teams]

    for (let m = 1 ; m <= matchesPerGw ; m++){
        let homeTeam = teams[Math.floor(Math.random() * teamsToDraw.length)]
        teamsToDraw.splice(teamsToDraw.indexOf(homeTeam),1)
        let awayTeam = teamsToDraw[Math.floor(Math.random() * teamsToDraw.length)]
        teamsToDraw.splice(teamsToDraw.indexOf(awayTeam),1)
        matches.push({
            id_match : `M${m}-GW${gw < 10 ? `00${gw}` : gw < 100 ? `0${gw}` : gw}`,
            home_team  : homeTeam.userName,
            hometeam_name : homeTeam.teamName , 
            away_team  : awayTeam.userName,
            awayteam_name : awayTeam.teamName ,
            round : `gw${gw}`,
        })
      }
  }


  return matches;
}
  
  module.exports = { generateLPmatches };
  