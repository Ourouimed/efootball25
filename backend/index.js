require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.ALLOW_CORS_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'your_db_name'
});

connection.connect(err => {
  if (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
  console.log('MySQL connected');
});

// Helper to generate random session code
function generateRandomCode(length = 50) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ------------------- Match Generation Functions ---------------------

function generateMatches(teams, totalRounds) {
  if (teams.length % 2 !== 0) teams.push("BYE");
  const matches = [];
  let teamList = [...teams];

  for (let round = 1; round <= totalRounds; round++) {
    for (let i = 0; i < teamList.length / 2; i++) {
      const teamA = teamList[i];
      const teamB = teamList[teamList.length - 1 - i];
      if (teamA !== "BYE" && teamB !== "BYE") {
        matches.push({
          id_match: `M${String(matches.length + 1).padStart(3, '0')}-GW${String(round).padStart(2, '0')}`,
          home_team: round % 2 === 0 ? teamB : teamA,
          away_team: round % 2 === 0 ? teamA : teamB,
          home_score: null,
          away_score: null,
          round: `GW${round}`,
        });
      }
    }
    const fixed = teamList[0];
    teamList = [fixed, ...teamList.slice(-1), ...teamList.slice(1, -1)];
  }

  return matches;
}

// ------------------- Endpoints ---------------------

app.get('/', (req, res) => {
  res.send('<h1>eFootball League Server</h1><p>Running</p>');
});

app.post('/register', (req, res) => {
  res.json({ message: 'Registration is closed. Try again later.' });
});

app.get('/teams', (req, res) => {
  connection.execute('SELECT * FROM teams', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error', message: err.message });
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  connection.execute(
    'SELECT * FROM users WHERE id = ? AND password = ?',
    [id, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error', message: err.message });
      if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

      const user = results[0];
      const sessionCode = generateRandomCode();

      connection.execute(
        'INSERT INTO session (id_session, id_user) VALUES (?, ?)',
        [sessionCode, user.id],
        (err2) => {
          if (err2) return res.status(500).json({ error: 'Session error', message: err2.message });
          res.json({ id: user.id, name: user.name, sessionCode });
        }
      );
    }
  );
});

app.post('/verify-session', (req, res) => {
  const { id, sessionCode } = req.body;
  if (!id || !sessionCode) return res.status(400).json({ error: 'Missing session info' });

  connection.execute(
    `SELECT S.*, U.role FROM session S INNER JOIN users U ON S.id_user = U.id 
     WHERE S.id_user = ? AND S.id_session = ?`,
    [id, sessionCode],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error', message: err.message });
      if (results.length === 0) return res.status(401).json({ error: 'Invalid session' });
      res.json(results[0]);
    }
  );
});

app.delete('/teams/:username', (req, res) => {
  const { username } = req.params;
  connection.execute(
    'DELETE FROM teams WHERE userName = ?', [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error', message: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Team not found' });
      res.json({ message: 'Team deleted', deletedCount: results.affectedRows });
    }
  );
});

app.delete('/logout', (req, res) => {
  const { id, sessionCode } = req.body;
  if (!id || !sessionCode) return res.status(400).json({ error: 'Missing data' });

  connection.execute(
    'DELETE FROM session WHERE id_user = ? AND id_session = ?',
    [id, sessionCode],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error', message: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Session not found' });
      res.json({ message: 'Logged out', terminatedSessions: results.affectedRows });
    }
  );
});

app.post('/teams/:username', (req, res) => {
  const { username } = req.params;
  const { teamName, phoneNum } = req.body;
  if (!teamName || !phoneNum) return res.status(400).json({ error: 'Missing update data' });

  connection.execute(
    'UPDATE teams SET teamName = ?, phoneNum = ? WHERE userName = ?',
    [teamName, phoneNum, username],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error', message: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Team not found' });
      res.json({ message: 'Team updated', updatedFields: { teamName, phoneNum } });
    }
  );
});

// ------------------ Match Score Update Endpoint ------------------

app.post('/matches/:id', async (req, res) => {
  const { id } = req.params;
  const { home_score, away_score } = req.body;

  if (home_score === undefined || away_score === undefined) {
    return res.status(400).json({ error: 'Missing score values' });
  }

  try {
    const [rows] = await connection.promise().execute(
      'SELECT * FROM matches WHERE id_match = ?', [id]
    );

    const oldMatch = rows[0];
    if (!oldMatch) return res.status(404).json({ error: 'Match not found' });
    if (!oldMatch.round.startsWith('GW')) {
      return res.status(403).json({ error: 'Only GW matches can be updated' });
    }

    const { home_team, away_team, home_score: old_home, away_score: old_away } = oldMatch;

    // Revert old stats
    if (old_home !== null && old_away !== null) {
      let [oldHomeUpdate, oldAwayUpdate] = ['', ''];

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

      await Promise.all([
        connection.promise().execute(
          `UPDATE teams SET GF = GF - ?, GA = GA - ?, ${oldHomeUpdate} WHERE userName = ?`,
          [old_home, old_away, home_team]
        ),
        connection.promise().execute(
          `UPDATE teams SET GF = GF - ?, GA = GA - ?, ${oldAwayUpdate} WHERE userName = ?`,
          [old_away, old_home, away_team]
        )
      ]);
    }

    // Update match
    await connection.promise().execute(
      'UPDATE matches SET home_score = ?, away_score = ? WHERE id_match = ?',
      [home_score, away_score, id]
    );

    // Apply new stats
    let [newHomeUpdate, newAwayUpdate] = ['', ''];
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

    await Promise.all([
      connection.promise().execute(
        `UPDATE teams SET GF = GF + ?, GA = GA + ?, ${newHomeUpdate} WHERE userName = ?`,
        [home_score, away_score, home_team]
      ),
      connection.promise().execute(
        `UPDATE teams SET GF = GF + ?, GA = GA + ?, ${newAwayUpdate} WHERE userName = ?`,
        [away_score, home_score, away_team]
      )
    ]);

    res.json({ message: 'Match updated successfully' });
  } catch (err) {
    console.error('Match update error:', err.message);
    res.status(500).json({ error: 'Update failed', message: err.message });
  }
});

// ------------------ Server Start ------------------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
