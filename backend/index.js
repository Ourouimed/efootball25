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

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promise-based wrapper for executing queries
const connection = pool.promise();

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
  let round = 1;

  for (round; round <= totalRounds; round++) {
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

app.post('/register', (req, res) => {
  const { teamName, phoneNum, userName } = req.body;

  connection.execute(
    'INSERT INTO teams (userName, teamName, phoneNum) VALUES (?, ?, ?)', 
    [userName, teamName, phoneNum], 
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      res.json({ message: 'Data inserted successfully!', id: results.insertId });
    }
  );
});

app.get('/teams', async (req, res) => {
  try {
    const [results] = await connection.execute('SELECT * FROM teams');
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Error fetching teams' });
  }
});

app.post('/login', (req, res) => {
  const { id, password } = req.body;
  connection.execute('SELECT * FROM users WHERE id = ? AND password = ?', [id, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error fetching users' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    let randomSessionId = generateRandomCode(50);
    connection.execute('INSERT INTO session (id_session, id_user) values (?, ?)', [randomSessionId, user.id]);
    res.json({ ...user, sessionCode: randomSessionId });
  });
});

app.post('/verify-session', (req, res) => {
  const { id, sessionCode } = req.body;
  connection.execute(
    'SELECT S.*, U.role FROM session S INNER JOIN users U ON S.id_user = U.id WHERE id_user = ? AND id_session = ?',
    [id, sessionCode],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error fetching session' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid session' });
      }
      const session = results[0];
      res.json(session);
    }
  );
});

app.delete('/teams/:username', (req, res) => {
  const { username } = req.params;
  
  connection.execute(
    'DELETE FROM teams WHERE userName = ?',
    [username],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error deleting team' });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Team not found' });
      }
      
      res.json({ message: 'Team deleted successfully' });
    }
  );
});

app.post('/matches/:id', (req, res) => {
  const { id } = req.params;
  const { home_score, away_score } = req.body;

  connection.execute('SELECT * FROM matches WHERE id_match = ?', [id], (err, [oldMatch]) => {
    if (err || !oldMatch) {
      console.error('Error fetching old match:', err);
      return res.status(500).json({ error: 'Match not found or error fetching match' });
    }

    const { home_team, away_team, home_score: old_home, away_score: old_away } = oldMatch;

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

    connection.execute('UPDATE matches SET home_score = ?, away_score = ? WHERE id_match = ?', [home_score, away_score, id], (err, results) => {
      if (err) {
        console.error('Error updating match:', err);
        return res.status(500).json({ error: 'Failed to update match' });
      }

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

      res.json({ message: 'Match score and team stats updated successfully' });
    });
  });
});

app.get('/matches', async (req, res) => {
  try {
    const [results] = await connection.execute('SELECT * FROM matches');
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Error fetching matches' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
