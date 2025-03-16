// const Matches = [
//     // gameweek 1
//     [
//         // match 1 
//         {
//             teamA : 'teamA',
//             teamB : 'teamB',
//             score : 'Vs'
//         },
//         // match 2 
//         {
//             teamA : 'teamA',
//             teamB : 'teamB',
//             score : 'Vs'
//         }
//     ],
//     [
//         // match 1 
//         {
//             teamA : 'suiii',
//             teamB : 'teafffmB',
//             score : 'Vs'
//         },
//         // match 2 
//         {
//             teamA : 'ffrf',
//             teamB : 'teamB',
//             score : 'Vs'
//         }
//     ]
//     // gameweek2
// ]

// export default Matches
import Teams from './teams'
const generateMatchesByGameWeeks = (teams) => {
    const totalTeams = teams.length;
    const totalGameWeeks = totalTeams - 1; // Each team plays every other team once
    const matchesPerGameWeek = totalTeams / 2;

    const matches = [];

    // Create a list of team indices for scheduling
    let teamIndices = teams.map((_, index) => index);

    for (let week = 0; week < totalGameWeeks; week++) {
        const gameWeekMatches = [];

        // Schedule matches for the current game week
        for (let i = 0; i < matchesPerGameWeek; i++) {
            const teamAIndex = teamIndices[i];
            const teamBIndex = teamIndices[totalTeams - 1 - i];

            gameWeekMatches.push({
                teamA: teams[teamAIndex].teamName,
                teamB: teams[teamBIndex].teamName,
                score: 'Vs', // Default score, can be updated later
            });
        }

        // Add the game week matches to the matches array
        matches.push(gameWeekMatches);

        // Rotate the team indices for the next game week (except the first team)
        teamIndices = [teamIndices[0], ...teamIndices.slice(2), teamIndices[1]];
    }

    return matches;
};

// Generate the matches array by game weeks
const Matches = generateMatchesByGameWeeks(Teams);

// Export the matches array
export default Matches;