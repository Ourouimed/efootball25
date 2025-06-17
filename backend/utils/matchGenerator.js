function generateLPmatches(teams, totalGws = 8) {
  const allGeneratedMatches = []; // Stores the final list of match objects
  const playedPairs = new Set(); // Stores unique match combinations (e.g., "user1-user2")
  const numTeams = teams.length;
  const matchesPerGw = numTeams / 2;

  if (numTeams % 2 !== 0) {
      throw new Error('Number of teams must be even');
  }

  // Pre-calculate all possible unique pairs to check against later if needed,
  // and to provide warnings if there aren't enough possible matches for all GWS.
  const allPossibleUniquePairs = new Set();
  for (let i = 0; i < numTeams; i++) {
      for (let j = i + 1; j < numTeams; j++) {
          const team1 = teams[i].userName;
          const team2 = teams[j].userName;
          // Canonical representation for uniqueness
          allPossibleUniquePairs.add([team1, team2].sort().join('-'));
      }
  }

  if (allPossibleUniquePairs.size < (totalGws * matchesPerGw)) {
      console.warn(`Warning: There are ${allPossibleUniquePairs.size} unique match combinations possible, but you requested ${totalGws * matchesPerGw} matches across ${totalGws} gameweeks. The function might generate fewer than the requested matches or reuse pairs if forced.`);
  }


  for (let gw = 1; gw <= totalGws; gw++) {
      let teamsAvailableThisGw = [...teams]; // Reset for each gameweek
      const currentGwMatches = [];
      let attemptsToFindUniqueMatch = 0; // Prevent infinite loops in this GW
      const maxAttemptsForGw = numTeams * numTeams * 10; // Generous limit

      while (currentGwMatches.length < matchesPerGw && teamsAvailableThisGw.length >= 2) {
          if (attemptsToFindUniqueMatch > maxAttemptsForGw) {
              console.warn(`Could not find enough unique matches for GW${gw}. Generated ${currentGwMatches.length} out of ${matchesPerGw}.`);
              break; // Exit if stuck trying to find unique pairs
          }

          // Randomly pick a home team
          const homeTeamIndex = Math.floor(Math.random() * teamsAvailableThisGw.length);
          const homeTeam = teamsAvailableThisGw[homeTeamIndex];

          // Get potential away teams (all except homeTeam)
          const potentialAwayTeams = teamsAvailableThisGw.filter(team => team.userName !== homeTeam.userName);

          if (potentialAwayTeams.length === 0) {
              // This shouldn't happen if teamsAvailableThisGw.length >= 2, but as a safeguard
              attemptsToFindUniqueMatch++;
              continue;
          }

          // Randomly pick an away team from the remaining
          const awayTeamIndex = Math.floor(Math.random() * potentialAwayTeams.length);
          const awayTeam = potentialAwayTeams[awayTeamIndex];

          // Create canonical match string
          const matchString = [homeTeam.userName, awayTeam.userName].sort().join('-');

          // Check if this specific match (pair of teams) has already been played in *any* previous gameweek
          if (!playedPairs.has(matchString)) {
              // If it's a new unique match
              playedPairs.add(matchString);
              currentGwMatches.push({
                  id_match: `M${
                    currentGwMatches.length + 1 < 10 ? `00${currentGwMatches.length + 1}` : 
                    currentGwMatches.length + 1 < 100 ? `0${currentGwMatches.length + 1}` :
                    currentGwMatches.length + 1

                  }-GW${gw}`,
                  home_team: homeTeam.userName,
                  hometeam_name: homeTeam.teamName,
                  away_team: awayTeam.userName,
                  awayteam_name: awayTeam.teamName,
                  round: `GW${gw}`,
              });

              // Remove both teams from `teamsAvailableThisGw` so they don't play again in *this gameweek*
              // Use filter to create a new array without the matched teams
              teamsAvailableThisGw = teamsAvailableThisGw.filter(
                  team => team.userName !== homeTeam.userName && team.userName !== awayTeam.userName
              );
              attemptsToFindUniqueMatch = 0; // Reset attempts after a successful match
          } else {
              // If it's a duplicate match, increment attempts and try again without removing teams
              attemptsToFindUniqueMatch++;
          }
      }
      allGeneratedMatches.push(...currentGwMatches); // Add matches of current GW to the total list
  }

  return allGeneratedMatches;
}

module.exports = { generateLPmatches };