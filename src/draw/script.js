import teams from '../admin/teams.js'
// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to generate 4 gameweeks
function generateGameweeks(teams) {
    const numTeams = teams.length;
    const matchesPerGameweek = Math.floor(numTeams / 2);
    const numGameweeks = 4; // Limit to 4 gameweeks
    const gameweeks = [];

    for (let week = 0; week < numGameweeks; week++) {
        const matches = [];
        const shuffledTeams = shuffleArray([...teams]); // Shuffle teams for randomness

        // Assign matches
        for (let i = 0; i < matchesPerGameweek; i++) {
            const teamA = shuffledTeams.pop(); // Take the last team as teamA
            const teamB = shuffledTeams.pop(); // Take the last team as teamB
            matches.push({
                teamA: teamA.teamName,
                teamB: teamB.teamName,
                score: 'Vs'
            });
        }

        // Add matches to the gameweek
        gameweeks.push(matches);
    }

    return gameweeks;
}

// DOM Elements
const teamList = document.getElementById('team-list');
const drawButton = document.getElementById('draw-button');
const gameweeksSection = document.getElementById('gameweeks-section');
const gameweeksResult = document.getElementById('gameweeks-result');

// Display Teams
teams.forEach(team => {
    const listItem = document.createElement('li');
    listItem.textContent = team.teamName;
    teamList.appendChild(listItem);
});

// Perform Draw on Button Click
drawButton.addEventListener('click', () => {
    const gameweeks = generateGameweeks(teams);
    gameweeksResult.textContent = JSON.stringify(gameweeks, null, 2);
    gameweeksSection.style.display = 'block';
});