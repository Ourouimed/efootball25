function generateLPmatches(teams, totalGws) {
  if (teams.length % 2 !== 0) {
    throw new Error('Number of teams must be even');
  }

  const T = teams.length;
  if (totalGws > T - 1) {
    throw new Error('Number of gameweeks must be less than number of teams');
  }

  const schedule = [];
  const teamList = [...teams];

  // Fix one team and rotate the others
  const fixedTeam = teamList.pop(); // remove the last team
  const rotating = [...teamList];

  for (let gw = 1; gw <= totalGws; gw++) {
    const gameweek = [];

    const roundTeams = [fixedTeam, ...rotating];
    for (let i = 0; i < T / 2; i++) {
      const home = roundTeams[i];
      const away = roundTeams[T - 1 - i];

      gameweek.push({
        id_match: `M${String(i + 1).padStart(3, '0')}-GW${gw}`,
        home_team: home.userName,
        hometeam_name: home.teamName,
        away_team: away.userName,
        awayteam_name: away.teamName,
        round: `GW${gw}`,
      });
    }

    schedule.push(...gameweek);

    // Rotate for next week
    rotating.unshift(rotating.pop()); // rotate right
  }

  return schedule;
}





function generateKoMatches (teams , round){
  if (teams.length % 2 !== 0){
    throw new Error('Number of teams must be even');
  }

  if (!['PO' , 'QF'  , 'SF'].includes(round)){
    throw new Error('Unknown round');
  }
  const teamsToDraw = [...teams]
  const matches = []
  const numTeams = teams.length;
  const totalMatches = numTeams / 2

  for (let i = 1; i <= totalMatches;i++){
    let homeTeamIndex = Math.floor(Math.random() * teamsToDraw.length)
    const homeTeam = teamsToDraw.splice(homeTeamIndex, 1)[0]

    let awayTeamIndex = Math.floor(Math.random() * teamsToDraw.length)
    const awayTeam = teamsToDraw.splice(awayTeamIndex, 1)[0]

    matches.push({
      id_match: `M${
        i < 10 ? `00${i}` : 
        i < 100 ? `0${i}` :
        i 

      }-${round}`,
      home_team: homeTeam.userName,
      hometeam_name: homeTeam.teamName,
      away_team: awayTeam.userName,
      awayteam_name: awayTeam.teamName,
      round: round,
  })


  }
  return matches
}

function generateR16matches (pot1 , pot2){
    let matches = []
    for (let i = 1; i <= 8;i++){
        let homeTeamIndex = Math.floor(Math.random() * pot1.length)
        const homeTeam = pot1.splice(homeTeamIndex, 1)[0]
    
        let awayTeamIndex = Math.floor(Math.random() * pot2.length)
        const awayTeam = pot2.splice(awayTeamIndex, 1)[0]

        
    
        matches.push({
          id_match: `M${
            i < 10 ? `00${i}` : 
            i < 100 ? `0${i}` :
            i 
    
          }-R16`,
          home_team: homeTeam.userName,
          hometeam_name: homeTeam.teamName,
          away_team: awayTeam.userName,
          awayteam_name: awayTeam.teamName,
          round: `R16`,
      })
    
    
      }
      return matches

}

  
module.exports = { generateLPmatches , generateKoMatches , generateR16matches };