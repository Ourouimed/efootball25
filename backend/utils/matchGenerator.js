function generateLPmatches(teams, totalGws) {
  if (!Number.isInteger(totalGws) || totalGws <= 0 || totalGws % 2 !== 0) {
      throw new Error('totalGws must be a positive, even integer (to allow for equal home/away matches).');
  }


  // So, the number of teams must be at least totalGws + 1 to ensure enough unique opponents are available.
  if (teams.length < totalGws + 1) {
      throw new Error(`Number of teams (${teams.length}) is too low to ensure ${totalGws} unique opponents for each team. Need at least ${totalGws + 1} teams.`);
  }

  const matches = [];
  const numTeams = teams.length;
  
  // Track opponents for each team to ensure uniqueness and home/away balance
  const teamOpponents = new Map(); // Map: team.userName -> Set of opponent.userName
  const teamHomeCounts = new Map(); // Map: team.userName -> count of home matches
  const teamAwayCounts = new Map(); // Map: team.userName -> count of away matches

  teams.forEach(team => {
      teamOpponents.set(team.userName, new Set());
      teamHomeCounts.set(team.userName, 0);
      teamAwayCounts.set(team.userName, 0);
  });

  let matchIdCounter = 1;

  // We need to generate 'totalGws' matches for each team.
  // This iterative approach attempts to fill all match slots for all teams.
  
  let teamsNeedingMatches = new Set(teams.map(t => t.userName));
  let attempts = 0; 
  const MAX_ATTEMPTS = numTeams * totalGws * 10; // Increased safety net for variable totalGws

  while (teamsNeedingMatches.size > 0 && attempts < MAX_ATTEMPTS) {
      attempts++;
      const currentTeamsNeedingMatches = Array.from(teamsNeedingMatches);
      teamsNeedingMatches.clear(); // Reset for this iteration

      // Sort teams by how many matches they still need (descending) to prioritize harder-to-schedule teams
      currentTeamsNeedingMatches.sort((a, b) => {
          const teamA_matches = teamHomeCounts.get(a) + teamAwayCounts.get(a);
          const teamB_matches = teamHomeCounts.get(b) + teamAwayCounts.get(b);
          return (totalGws - teamA_matches) - (totalGws - teamB_matches);
      });

      // Iterate through teams that still need matches
      for (const teamUserName of currentTeamsNeedingMatches) {
          const team = teams.find(t => t.userName === teamUserName);

          let matchesForTeam = teamHomeCounts.get(team.userName) + teamAwayCounts.get(team.userName);

          // If the team already has totalGws matches, skip
          if (matchesForTeam >= totalGws) {
              continue;
          }

          // Find an opponent for this team
          let foundOpponentForThisTeam = false;
          // Shuffle teams to find a random opponent
          const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

          for (const opponent of shuffledTeams) {
              if (team.userName === opponent.userName) continue; // Cannot play self

              // Check if they've already played or are currently scheduled
              if (teamOpponents.get(team.userName).has(opponent.userName) || teamOpponents.get(opponent.userName).has(team.userName)) {
                  continue; // Already played this opponent
              }

              // Determine if this can be a home or away match for 'team'
              let isHomePossibleForTeam = teamHomeCounts.get(team.userName) < totalGws / 2;
              let isAwayPossibleForTeam = teamAwayCounts.get(team.userName) < totalGws / 2;

              // Also check counts for the opponent
              let isHomePossibleForOpponent = teamHomeCounts.get(opponent.userName) < totalGws / 2;
              let isAwayPossibleForOpponent = teamAwayCounts.get(opponent.userName) < totalGws / 2;

              let homeTeam, awayTeam;
              let matchAdded = false;

              // Try to make team the home team
              if (isHomePossibleForTeam && isAwayPossibleForOpponent) {
                  homeTeam = team;
                  awayTeam = opponent;
                  matchAdded = true;
              } 
              // If not possible, try to make team the away team
              else if (isAwayPossibleForTeam && isHomePossibleForOpponent) {
                  homeTeam = opponent;
                  awayTeam = team;
                  matchAdded = true;
              }

              if (matchAdded) {
                  // Ensure the matchup hasn't been added yet (in exact home/away direction)
                  const existingExactMatch = matches.some(m => 
                      m.home_team === homeTeam.userName && m.away_team === awayTeam.userName
                  );

                  if (existingExactMatch) {
                      matchAdded = false; // This specific home/away fixture already exists
                  }
              }
              
              if (matchAdded) {
                  matches.push({
                      id_match: `M${String(matchIdCounter++).padStart(3, '0')}-GW`, // GW placeholder for now, will be assigned later
                      home_team: homeTeam.userName,
                      hometeam_name: homeTeam.teamName,
                      away_team: awayTeam.userName,
                      awayteam_name: awayTeam.teamName,
                      round: `GW?`, // Temporarily unknown GW
                  });

                  // Update counts and opponent sets for both teams
                  teamOpponents.get(homeTeam.userName).add(awayTeam.userName);
                  teamOpponents.get(awayTeam.userName).add(homeTeam.userName); // Add for both directions for easier check
                  
                  teamHomeCounts.set(homeTeam.userName, teamHomeCounts.get(homeTeam.userName) + 1);
                  teamAwayCounts.set(awayTeam.userName, teamAwayCounts.get(awayTeam.userName) + 1);

                  foundOpponentForThisTeam = true;
                  break; // Found an opponent for the current 'team', move to next team needing matches
              }
          }

          // If team still needs matches after trying to find an opponent, add it back to the list for the next attempt
          if (teamHomeCounts.get(team.userName) + teamAwayCounts.get(team.userName) < totalGws) {
              teamsNeedingMatches.add(team.userName);
          }
      }
  }

  // After all matches are generated, assign them to 'totalGws' "GWs" for display purposes.
  // This part is arbitrary as the actual UCL schedule is not strictly Gws based in terms of pairings per GW.
  // We'll just distribute them roughly evenly.
  const matchesPerGw = Math.ceil(matches.length / totalGws);
  let currentGw = 1;
  let matchesInCurrentGw = 0;
  for (let i = 0; i < matches.length; i++) {
      matches[i].round = `GW${currentGw}`;
      matchesInCurrentGw++;
      if (matchesInCurrentGw >= matchesPerGw && currentGw < totalGws) {
          currentGw++;
          matchesInCurrentGw = 0;
      }
  }


  // Final check to ensure all teams have 'totalGws' matches, 'totalGws/2' home and 'totalGws/2' away
  teams.forEach(team => {
      const totalMatches = teamHomeCounts.get(team.userName) + teamAwayCounts.get(team.userName);
      const homeMatches = teamHomeCounts.get(team.userName);
      const awayMatches = teamAwayCounts.get(team.userName);
      if (totalMatches !== totalGws || homeMatches !== totalGws / 2 || awayMatches !== totalGws / 2) {
          console.warn(`Warning: Team ${team.userName} did not get the correct number of matches. 
                        Expected ${totalGws} (Total), ${totalGws/2} (Home), ${totalGws/2} (Away). 
                        Got: ${totalMatches} (Total), ${homeMatches} (Home), ${awayMatches} (Away). 
                        This can happen with an insufficient number of teams for a perfect distribution or edge cases.`);
      }
  });

  return matches;
}

function generatePomatches (teams){

  const teamsToDraw = [...teams]
  const matches = []
  const numTeams = teams.length;
  const totalMatches = numTeams / 2

  for (let i = 1; i <= totalMatches;i++){
    let homeTeamIndex = Math.floor(Math.random() * teamsToDraw.length)
    const homeTeam = teamsToDraw[homeTeamIndex]
    teamsToDraw.splice(homeTeamIndex, 1)

    let awayTeamIndex = Math.floor(Math.random() * teamsToDraw.length)
    const awayTeam = teamsToDraw[awayTeamIndex]
    teamsToDraw.splice(awayTeamIndex, 1)

    matches.push({
      id_match: `M${
        i < 10 ? `00${i}` : 
        i < 100 ? `0${i}` :
        i 

      }-PO`,
      home_team: homeTeam.userName,
      hometeam_name: homeTeam.teamName,
      away_team: awayTeam.userName,
      awayteam_name: awayTeam.teamName,
      round: `PO`,
  })


  }
  return matches
}


function generateR16matches (pot1 , pot2){
    let matches = []
    for (let i = 1; i <= 8;i++){
        let homeTeamIndex = Math.floor(Math.random() * pot1.length)
        const homeTeam = pot1[homeTeamIndex]
        pot1.splice(homeTeamIndex, 1)
    
        let awayTeamIndex = Math.floor(Math.random() * pot2.length)
        const awayTeam = pot2[awayTeamIndex]
        pot2.splice(awayTeamIndex, 1)

        console.log(homeTeam.userName)
        console.log(awayTeam.userName)
    
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


function generateQFmatches (teams){

    const teamsToDraw = [...teams]
    const matches = []
    const numTeams = teams.length;
    const totalMatches = numTeams / 2
  
    for (let i = 1; i <= totalMatches;i++){
      let homeTeamIndex = Math.floor(Math.random() * teamsToDraw.length)
      const homeTeam = teamsToDraw[homeTeamIndex]
      teamsToDraw.splice(homeTeamIndex, 1)
  
      let awayTeamIndex = Math.floor(Math.random() * teamsToDraw.length)
      const awayTeam = teamsToDraw[awayTeamIndex]
      teamsToDraw.splice(awayTeamIndex, 1)
  
      matches.push({
        id_match: `M${
          i < 10 ? `00${i}` : 
          i < 100 ? `0${i}` :
          i 
  
        }-QF`,
        home_team: homeTeam.userName,
        hometeam_name: homeTeam.teamName,
        away_team: awayTeam.userName,
        awayteam_name: awayTeam.teamName,
        round: `QF`,
    })
  
  
    }
    return matches
  }

  function generateSFmatches (teams){

    const teamsToDraw = [...teams]
    const matches = []
    const numTeams = teams.length;
    const totalMatches = numTeams / 2
  
    for (let i = 1; i <= totalMatches;i++){
      let homeTeamIndex = Math.floor(Math.random() * teamsToDraw.length)
      const homeTeam = teamsToDraw[homeTeamIndex]
      teamsToDraw.splice(homeTeamIndex, 1)
  
      let awayTeamIndex = Math.floor(Math.random() * teamsToDraw.length)
      const awayTeam = teamsToDraw[awayTeamIndex]
      teamsToDraw.splice(awayTeamIndex, 1)
  
      matches.push({
        id_match: `M${
          i < 10 ? `00${i}` : 
          i < 100 ? `0${i}` :
          i 
  
        }-SF`,
        home_team: homeTeam.userName,
        hometeam_name: homeTeam.teamName,
        away_team: awayTeam.userName,
        awayteam_name: awayTeam.teamName,
        round: `SF`,
    })
  
  
    }
    return matches
  }
  
module.exports = { generateLPmatches , generatePomatches , generateR16matches ,  generateQFmatches , generateSFmatches};