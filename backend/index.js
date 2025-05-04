require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'https://efootball25-league.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'your_db_name'
});

try {
  connection.connect(err => {
    if (err) {
      console.error('Database connection error:', err);
      return;
    }
    console.log('Connected to the database');
  });
} catch (err) {
  console.error('Database connection error:', err);
}

function generateRandomCode(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  
  return result;
}

function generateMatches(teams, totalRounds) {
  const matches = [];
  const teamPool = [...teams];
  const matchesPerRound = teamPool.length / 2;

  for (let round = 1; round <= totalRounds; round++) {
    const roundTeams = [...teamPool]; 
    
    for (let matchNum = 1; matchNum <= matchesPerRound; matchNum++) {
      if (roundTeams.length < 2) break;

      const homeIndex = Math.floor(Math.random() * roundTeams.length);
      const homeTeam = roundTeams[homeIndex];
      roundTeams.splice(homeIndex, 1);

      const awayIndex = Math.floor(Math.random() * roundTeams.length);
      const awayTeam = roundTeams[awayIndex];
      roundTeams.splice(awayIndex, 1);

      matches.push({
        id_match: `M${String(matchNum).padStart(3, '0')}-GW${String(round).padStart(2, '0')}`,
        home_team: homeTeam,
        away_team: awayTeam,
        home_score: null,
        away_score: null,
        round: `GW${round}`
      });
    }
  }

  return matches;
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

// Matches Routes

// Get all matches
app.get('/matches', (req, res) => {
  connection.execute('SELECT * FROM matches', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error fetching matches. Please try again later.' });
    }
    res.json(results);
  });
});

// Create or update match scores
app.post('/matches/:id', (req, res) => {
  const { id } = req.params;
  const { home_score, away_score } = req.body;

  // Step 1: Get the old match data
  connection.execute('SELECT * FROM matches WHERE id_match = ?', [id], (err, [oldMatch]) => {
    if (err || !oldMatch) {
      console.error('Error fetching old match:', err);
      return res.status(500).json({ error: 'Match not found or error fetching match.' });
    }

    const { home_team, away_team, home_score: old_home, away_score: old_away } = oldMatch;

    // Step 2: If there was an old score, revert its effect
    if (old_home !== null && old_away !== null) {
      let oldHomeUpdate = '', oldAwayUpdate = '';

      if (old_home > old_away) {
        oldHomeUpdate = 'wins = wins - 1';
        oldAwayUpdate = 'losses = losses - 1';
      } else if (old_home < old_away) {
        oldHomeUpdate = 'losses = losses - 1';
        oldAwayUpdate = 'wins = wins - 1';
      } else {
        oldHomeUpdate = 'draws = draws - 1';
        oldAwayUpdate = 'draws = draws - 1';
      }

      connection.execute(`UPDATE teams SET GF = GF - ?, GA = GA - ?, ${oldHomeUpdate} WHERE userName = ?`, [old_home, old_away, home_team]);
      connection.execute(`UPDATE teams SET GF = GF - ?, GA = GA - ?, ${oldAwayUpdate} WHERE userName = ?`, [old_away, old_home, away_team]);
    }

    // Step 3: Update the match score
    connection.execute('UPDATE matches SET home_score = ?, away_score = ? WHERE id_match = ?', [home_score, away_score, id], (err, results) => {
      if (err) {
        console.error('Error updating match:', err);
        return res.status(500).json({ error: 'Failed to update match.' });
      }

      // Step 4: If the new score is valid, apply new stats
      if (home_score !== null && away_score !== null) {
        let newHomeUpdate = '', newAwayUpdate = '';

        if (home_score > away_score) {
          newHomeUpdate = 'wins = wins + 1';
          newAwayUpdate = 'losses = losses + 1';
        } else if (home_score < away_score) {
          newHomeUpdate = 'losses = losses + 1';
          newAwayUpdate = 'wins = wins + 1';
        } else {
          newHomeUpdate = 'draws = draws + 1';
          newAwayUpdate = 'draws = draws + 1';
        }

        connection.execute(`UPDATE teams SET GF = GF + ?, GA = GA + ?, ${newHomeUpdate} WHERE userName = ?`, [home_score, away_score, home_team]);
        connection.execute(`UPDATE teams SET GF = GF + ?, GA = GA + ?, ${newAwayUpdate} WHERE userName = ?`, [away_score, home_score, away_team]);
      }

      res.json({ message: 'Match score and team stats updated successfully.' });
    });
  });
});

// Generate new matches
app.post('/generate-matches', (req, res) => {
  connection.execute('DELETE FROM matches', (err) => {
    if (err) {
      console.error('Error deleting matches:', err);
      return res.status(500).json({ error: 'Error deleting matches. Please try again later.' });
    }

    // 2. Reset team stats
    connection.execute('UPDATE teams SET wins = 0, losses = 0, draws = 0, GF = 0, GA = 0', (err) => {
      if (err) {
        console.error('Error resetting team stats:', err);
        return res.status(500).json({ error: 'Error resetting team stats. Please try again later.' });
      }

      // 3. Fetch teams
      connection.execute('SELECT * FROM teams', (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error fetching teams. Please try again later.' });
        }

        const teams = results;
        const gws = 8;
        const matches = generateMatches(teams, gws);

        const query = `INSERT INTO matches (id_match, home_team, hometeam_name, home_score, away_team, awayteam_name, away_score, round) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        matches.forEach(match => {
          connection.execute(query, [
            match.id_match,
            match.home_team.userName,
            match.home_team.teamName,
            match.home_score,
            match.away_team.userName,
            match.away_team.teamName,
            match.away_score,
            match.round
          ]);
        });

        res.json({ message: 'Matches generated and team stats reset.' });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
