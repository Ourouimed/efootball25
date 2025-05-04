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
  res.send('<h1>Hello World</h1>')
});

app.post('/register', (req, res) => {
  const { teamName, phoneNum, userName } = req.body;

  connection.execute(
    'INSERT INTO teams (userName, teamName, phoneNum) VALUES (?, ?, ?)', 
    [userName, teamName, phoneNum], 
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Something went wrong while processing your request. Please try again later.' });
      }
      res.json({ message: 'Data inserted successfully!', id: results.insertId });
    }
  );
});

app.get('/teams', (req, res) => {
  connection.execute('SELECT * FROM teams', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error fetching teams, please try again later.' });
    }
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { id, password } = req.body;
  
  connection.execute(
    'SELECT * FROM users WHERE id = ? AND password = ?',
    [id, password],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Something went wrong during login. Please try again later.' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials, please check your login details.' });
      }

      const user = results[0];
      let randomSessionId = generateRandomCode(50);

      connection.execute(
        'INSERT INTO session (id_session, id_user) VALUES (?, ?)',
        [randomSessionId, user.id],
        (err, results) => {
          if (err) {
            console.error('Session error:', err);
            return res.status(500).json({ error: 'Error creating session, please try again later.' });
          }

          res.json({ ...user, sessionCode: randomSessionId });
        }
      );
    }
  );
});

app.post('/verify-session', (req, res) => {
  const { id, sessionCode } = req.body;
  connection.execute(
    'SELECT S.*, U.role FROM session S INNER JOIN users U ON S.id_user = U.id WHERE id_user = ? AND id_session = ?',
    [id, sessionCode],
    (err, results) => {
      if (err) {
        console.error('Session verification error:', err);
        return res.status(500).json({ error: 'Error verifying session, please try again later.' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid session or credentials.' });
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
        return res.status(500).json({ error: 'Something went wrong while deleting the team. Please try again later.' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Team not found.' });
      }

      res.json({ message: 'Team deleted successfully.' });
    }
  );
});

app.delete('/logout', (req, res) => {
  const { id, sessionCode } = req.body;
  connection.execute(
    'DELETE FROM session WHERE id_user = ? AND id_session = ?',
    [id, sessionCode],
    (err, results) => {
      if (err) {
        console.error('Session logout error:', err);
        return res.status(500).json({ error: 'Error during logout, please try again later.' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Session not found.' });
      }
      
      res.json({ message: 'Session deleted successfully.' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
