require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise'); // Using promise-based version

const corsOptions = {
  origin: 'https://efootball25-league.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'your_db_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to execute SQL queries
async function executeQuery(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

// Test connection at startup
async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('Connected to MySQL database');
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
}

testConnection();

// Your existing utility functions
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

// Convert all your route handlers to async/await
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.post('/register', async (req, res) => {
  const { teamName, phoneNum, userName } = req.body;
  
  try {
    const results = await executeQuery(
      'INSERT INTO teams (userName, teamName, phoneNum) VALUES (?, ?, ?)', 
      [userName, teamName, phoneNum]
    );
    res.json({ message: 'Data inserted successfully!', id: results.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error inserting data' });
  }
});

app.get('/teams', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM teams');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching teams' });
  }
});

app.post('/login', async (req, res) => {
  const { id, password } = req.body;
  
  try {
    const results = await executeQuery(
      'SELECT * FROM users WHERE id = ? AND password = ?', 
      [id, password]
    );
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = results[0];
    let randomSessionId = generateRandomCode(50);
    
    await executeQuery(
      'INSERT INTO session (id_session, id_user) VALUES (?, ?)', 
      [randomSessionId, user.id]
    );
    
    res.json({ ...user, sessionCode: randomSessionId });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
});

app.post('/verify-session', async (req, res) => {
  const { id, sessionCode } = req.body;
  
  try {
    const results = await executeQuery(
      "SELECT S.*, U.role FROM session S INNER JOIN users U ON S.id_user = U.id WHERE id_user = ? AND id_session = ?",
      [id, sessionCode]
    );
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const session = results[0];
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Session verification error' });
  }
});

app.delete('/teams/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const results = await executeQuery(
      'DELETE FROM teams WHERE userName = ?', 
      [username]
    );
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting team' });
  }
});

app.delete('/logout', async (req, res) => {
  const { id, sessionCode } = req.body;
  
  try {
    const results = await executeQuery(
      'DELETE FROM session WHERE id_user = ? AND id_session = ?', 
      [id, sessionCode]
    );
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout error' });
  }
});

app.post('/teams/:username', async (req, res) => {
  const { username } = req.params;
  const { teamName, phoneNum } = req.body;
  
  if (!teamName || !phoneNum) {
    return res.status(400).json({ error: 'Team name and phone number are required' });
  }
  
  try {
    const results = await executeQuery(
      'UPDATE teams SET teamName = ?, phoneNum = ? WHERE userName = ?',
      [teamName, phoneNum, username]
    );
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json({ 
      message: 'Team updated successfully',
      updated: results.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating team' });
  }
});

app.post('/matches/:id', async (req, res) => {
  const { id } = req.params;
  const { home_score, away_score } = req.body;

  try {
    // Step 1: Get the old match data
    const oldMatches = await executeQuery('SELECT * FROM matches WHERE id_match = ?', [id]);
    if (!oldMatches || oldMatches.length === 0) {
      return res.status(500).json({ error: 'Match not found' });
    }
    
    const oldMatch = oldMatches[0];
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

      await executeQuery(`UPDATE teams SET GF = GF - ?, GA = GA - ?, ${oldHomeUpdate} WHERE userName = ?`, [old_home, old_away, home_team]);
      await executeQuery(`UPDATE teams SET GF = GF - ?, GA = GA - ?, ${oldAwayUpdate} WHERE userName = ?`, [old_away, old_home, away_team]);
    }

    // Step 3: Update the match score
    await executeQuery('UPDATE matches SET home_score = ?, away_score = ? WHERE id_match = ?', [home_score, away_score, id]);

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

      await executeQuery(`UPDATE teams SET GF = GF + ?, GA = GA + ?, ${newHomeUpdate} WHERE userName = ?`, [home_score, away_score, home_team]);
      await executeQuery(`UPDATE teams SET GF = GF + ?, GA = GA + ?, ${newAwayUpdate} WHERE userName = ?`, [away_score, home_score, away_team]);
    }

    res.json({ message: 'Match score and team stats updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating match' });
  }
});

app.get('/matches', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM matches');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching matches' });
  }
});

app.post('/generate-matches', async (req, res) => {
  try {
    // 1. Delete existing matches
    await executeQuery('DELETE FROM matches');
    
    // 2. Reset team stats
    await executeQuery('UPDATE teams SET wins = 0, losses = 0, draws = 0, GF = 0, GA = 0');
    
    // 3. Fetch teams
    const teams = await executeQuery('SELECT * FROM teams');
    
    const gws = 8;
    const matches = generateMatches(teams, gws);

    const query = `INSERT INTO matches (id_match, home_team, hometeam_name, home_score, away_team, awayteam_name, away_score, round) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // Using Promise.all to handle multiple inserts
    await Promise.all(matches.map(match => 
      executeQuery(query, [
        match.id_match,
        match.home_team.userName,
        match.home_team.teamName,
        match.home_score,
        match.away_team.userName,
        match.away_team.teamName,
        match.away_score,
        match.round
      ])
    ));

    res.json({ message: 'Matches generated and team stats reset' });
  } catch (error) {
    res.status(500).json({ error: 'Error generating matches' });
  }
});

// For local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;