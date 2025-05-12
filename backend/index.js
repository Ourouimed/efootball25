require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.ALLOW_CORS_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Database connection with improved error handling
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',   
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'your_db_name'
});

connection.connect(err => {
  if (err) {
    console.error('Failed to connect to MySQL database:', err.message);
    process.exit(1); // Exit the process if we can't connect to the database
  }
  console.log('Successfully connected to MySQL database');
});

// Utility function to generate random codes
function generateRandomCode(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  
  return result;
}

// Match generation logic
function generateMatches(teams, totalRounds) {
  if (teams.length % 2 !== 0) teams.push("BYE"); // Add dummy team if odd

  const totalTeams = teams.length;
  const half = totalTeams / 2;
  const matches = [];

  let teamList = [...teams]; // Copy original list

  for (let round = 1; round <= totalRounds; round++) {
    for (let i = 0; i < half; i++) {
      const teamA = teamList[i];
      const teamB = teamList[totalTeams - 1 - i];

      // Skip BYE matches
      if (teamA !== "BYE" && teamB !== "BYE") {
        matches.push({
          id_match: `M${String(matches.length + 1).padStart(3, '0')}-GW${String(round).padStart(2, '0')}`,
          home_team: round % 2 === 0 ? teamB : teamA, // Alternate home/away
          away_team: round % 2 === 0 ? teamA : teamB,
          home_score: null,
          away_score: null,
          round: `GW${round}`,
        });
      }
    }

    // Rotate teams for next round (except first team)
    const fixed = teamList[0];
    const rotated = [fixed, ...teamList.slice(-1), ...teamList.slice(1, -1)];
    teamList = rotated;
  }

  return matches;
}


function generatePoMatches(teams){
  let matches = []
  let sortedTeams = teams
  .map(team => ({...team , pts : (Number(team.wins) * 3) + (Number(team.draws) * 1) + (Number(team.losses) * 0)}))
  .sort((a, b) => b.pts - a.pts || (b.GF - b.GA) - (a.GF - a.GA)).slice(8,24)


  const TotalMatches = sortedTeams.length / 2

  for (let i = 0; i < TotalMatches ;i++){
    let homeTeamIndex= Math.floor(Math.random() * sortedTeams.length)
    let homeTeam = sortedTeams[homeTeamIndex]
    sortedTeams.splice(homeTeamIndex , 1)
    let awayTeamIndex= Math.floor(Math.random() * sortedTeams.length)
    let awayTeam = sortedTeams[awayTeamIndex]
    sortedTeams.splice(awayTeamIndex , 1)
    matches.push({
      id_match: `M${String(i + 1).padStart(3, '0')}-PO`,
      home_team: homeTeam,
      away_team: awayTeam,
      home_score: null,
      away_score: null,
      round: `PO`,
    })
  }


  return matches
}


function generateR16matches(pot1 , pot2) {
  let matches = [];
  let sortedTeams = pot2.map(team => ({
      ...team,
      pts: (Number(team.wins) * 3) + (Number(team.draws) * 1) + (Number(team.losses) * 0)
    })).sort((a, b) => b.pts - a.pts || (b.GF - b.GA) - (a.GF - a.GA));

  let pot2teams = sortedTeams.slice(0, 8);

  for (let i = 0; i < 8; i++) {
    let homeTeamIndex = Math.floor(Math.random() * pot1.length);
    let homeTeam = pot1.splice(homeTeamIndex, 1)[0];

    let awayTeamIndex = Math.floor(Math.random() * pot2teams.length);
    let awayTeam = pot2teams.splice(awayTeamIndex, 1)[0];

    matches.push({
      id_match: `M${String(i + 1).padStart(3, '0')}-R16`,
      home_team: homeTeam,
      away_team: awayTeam,
      home_score: null,
      away_score: null,
      round: `R16`,
    });
  }

  return matches;
}

function generateQFmatches(teams) {
  let matches = [];
  let sortedTeams = teams.map(team => ({
      ...team,
      pts: (Number(team.wins) * 3) + (Number(team.draws) * 1) + (Number(team.losses) * 0)
    })).sort((a, b) => b.pts - a.pts || (b.GF - b.GA) - (a.GF - a.GA)).filter(team => team.qualified === 1);

  for (let i = 0; i < 8; i++) {
    let homeTeamIndex = Math.floor(Math.random() * sortedTeams.length);
    let homeTeam = sortedTeams.splice(homeTeamIndex, 1)[0];

    let awayTeamIndex = Math.floor(Math.random() * sortedTeams.length);
    let awayTeam = sortedTeams.splice(awayTeamIndex, 1)[0];

    matches.push({
      id_match: `M${String(i + 1).padStart(3, '0')}-QF`,
      home_team: homeTeam,
      away_team: awayTeam,
      home_score: null,
      away_score: null,
      round: `QF`,
    });
  }

  return matches;
}





// Basic route for health check
app.get('/', (req, res) => {
  res.send('<h1>eFootball League Server</h1><p>Server is running</p>');
});

// Team registration endpoint
app.post('/register', (req, res) => {
  const { teamName, phoneNum, userName } = req.body;

  if (!teamName || !phoneNum || !userName) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'All fields are required'
    });
  }

  connection.execute(
    'INSERT INTO teams (userName, teamName, phoneNum) VALUES (?, ?, ?)', 
    [userName, teamName, phoneNum], 
    (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ 
            error: 'Duplicate entry',
            message: 'This username is already registered'
          });
        }
        console.error('Database insertion error:', err.message);
        return res.status(500).json({ 
          error: 'Database operation failed',
          message: 'Could not register the team. Please try again later.'
        });
      }
      res.json({ 
        message: 'Team registered successfully!', 
        teamId: results.insertId 
      });
    }
  );
  // res.json({
  //   message : 'register form is closed please try again later'
  // })
});

app.get('/teams', (req, res) => {
  connection.execute('SELECT * FROM teams', (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ 
        error: 'Database operation failed',
        message: 'Could not retrieve team list. Please try again later.'
      });
    }
    res.json(results);
  });
});

// User login endpoint
app.post('/login', (req, res) => {
  const { id, password } = req.body;
  
  if (!id || !password) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Both ID and password are required'
    });
  }

  connection.execute(
    'SELECT * FROM users WHERE id = ? AND password = ?',
    [id, password],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).json({ 
          error: 'Authentication failed',
          message: 'Could not verify credentials. Please try again later.'
        });
      }

      if (results.length === 0) {
        return res.status(401).json({ 
          error: 'Authentication failed',
          message: 'Invalid ID or password'
        });
      }

      const user = results[0];
      const randomSessionId = generateRandomCode(50);

      connection.execute(
        'INSERT INTO session (id_session, id_user) VALUES (?, ?)',
        [randomSessionId, user.id],
        (err, results) => {
          if (err) {
            console.error('Session creation error:', err.message);
            return res.status(500).json({ 
              error: 'Session creation failed',
              message: 'Could not create user session. Please try again later.'
            });
          }

          res.json({ 
            id: user.id,
            name : user.name, 
            sessionCode: randomSessionId,
            message: 'Login successful'
          });
        }
      );
    }
  );
});

// Session verification endpoint
app.post('/verify-session', (req, res) => {
  const { id, sessionCode } = req.body;
  
  if (!id || !sessionCode) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Both user ID and session code are required'
    });
  }

  connection.execute(
    "SELECT S.*, U.role FROM session S INNER JOIN users U ON S.id_user = U.id WHERE id_user = ? AND id_session = ?",
    [id, sessionCode], 
    (err, results) => {
      if (err) {
        console.error('Session verification error:', err.message);
        return res.status(500).json({ 
          error: 'Session verification failed',
          message: 'Could not verify session. Please try again later.'
        });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ 
          error: 'Session invalid',
          message: 'The provided session is invalid or expired. Please log in again.'
        });
      }
      
      res.json(results[0]);
    }
  );
});

// Team deletion endpoint
app.delete('/teams/:username', (req, res) => {
  const { username } = req.params;
  
  connection.execute(
    'DELETE FROM teams WHERE userName = ?', 
    [username], 
    (err, results) => {
      if (err) {
        console.error('Team deletion error:', err.message);
        return res.status(500).json({ 
          error: 'Team deletion failed',
          message: 'Could not delete the team. Please try again later.'
        });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ 
          error: 'Team not found',
          message: 'No team found with the specified username'
        });
      }
      
      res.json({ 
        message: 'Team deleted successfully',
        deletedCount: results.affectedRows
      });
    }
  );
});

// User logout endpoint
app.delete('/logout', (req, res) => {
  const { id, sessionCode } = req.body;
  
  if (!id || !sessionCode) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Both user ID and session code are required'
    });
  }

  connection.execute(
    'DELETE FROM session WHERE id_user = ? AND id_session = ?',
    [id, sessionCode],
    (err, results) => {
      if (err) {
        console.error('Logout error:', err.message);
        return res.status(500).json({ 
          error: 'Logout failed',
          message: 'Could not terminate the session. Please try again later.'
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ 
          error: 'Session not found',
          message: 'No active session found with the provided credentials'
        });
      }

      res.json({ 
        message: 'Logged out successfully',
        terminatedSessions: results.affectedRows
      });
    }
  );
});

// Team update endpoint
app.post('/teams/:username', (req, res) => {
  const { username } = req.params;
  const { teamName, phoneNum } = req.body;
  
  if (!teamName || !phoneNum) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Both team name and phone number are required for updates'
    });
  }

  connection.execute(
    'UPDATE teams SET teamName = ?, phoneNum = ? WHERE userName = ?',
    [teamName, phoneNum, username],
    (err, results) => {
      if (err) {
        console.error('Team update error:', err.message);
        return res.status(500).json({ 
          error: 'Team update failed',
          message: 'Could not update team information. Please try again later.'
        });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ 
          error: 'Team not found',
          message: 'No team found with the specified username'
        });
      }
      
      res.json({ 
        message: 'Team updated successfully',
        updatedFields: { teamName, phoneNum }
      });
    }
  );
});

// Match score update endpoint
app.post('/matches/:id', async (req, res) => {
  const { id } = req.params;
  const { home_score, away_score } = req.body;

  if (home_score === undefined || away_score === undefined) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Both home_score and away_score are required'
    });
  }

  try {
    const [rows] = await connection.promise().execute(
      'SELECT * FROM matches WHERE id_match = ?',
      [id]
    );

    const match = rows[0];
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const { home_team, away_team, home_score: oldHome, away_score: oldAway, round } = match;
    const isGW = round.startsWith("GW");

    // Revert old score effects if they exist
    if (oldHome !== null && oldAway !== null && isGW) {
      const updates = [];

      if (oldHome > oldAway) {
        updates.push(
          connection.promise().execute(
            'UPDATE teams SET wins = wins - 1, GF = GF - ?, GA = GA - ? WHERE teamName = ?',
            [oldHome, oldAway, home_team]
          ),
          connection.promise().execute(
            'UPDATE teams SET losses = losses - 1, GF = GF - ?, GA = GA - ? WHERE teamName = ?',
            [oldAway, oldHome, away_team]
          )
        );
      } else if (oldHome < oldAway) {
        updates.push(
          connection.promise().execute(
            'UPDATE teams SET losses = losses - 1, GF = GF - ?, GA = GA - ? WHERE teamName = ?',
            [oldHome, oldAway, home_team]
          ),
          connection.promise().execute(
            'UPDATE teams SET wins = wins - 1, GF = GF - ?, GA = GA - ? WHERE teamName = ?',
            [oldAway, oldHome, away_team]
          )
        );
      } else {
        updates.push(
          connection.promise().execute(
            'UPDATE teams SET draws = draws - 1, GF = GF - ?, GA = GA - ? WHERE teamName = ?',
            [oldHome, oldAway, home_team]
          ),
          connection.promise().execute(
            'UPDATE teams SET draws = draws - 1, GF = GF - ?, GA = GA - ? WHERE teamName = ?',
            [oldAway, oldHome, away_team]
          )
        );
      }

      await Promise.all(updates);
    }

    // Apply new score effects (if group stage)
    if (isGW) {
      const updates = [];

      if (home_score > away_score) {
        updates.push(
          connection.promise().execute(
            'UPDATE teams SET wins = wins + 1, GF = GF + ?, GA = GA + ? WHERE teamName = ?',
            [home_score, away_score, home_team]
          ),
          connection.promise().execute(
            'UPDATE teams SET losses = losses + 1, GF = GF + ?, GA = GA + ? WHERE teamName = ?',
            [away_score, home_score, away_team]
          )
        );
      } else if (home_score < away_score) {
        updates.push(
          connection.promise().execute(
            'UPDATE teams SET losses = losses + 1, GF = GF + ?, GA = GA + ? WHERE teamName = ?',
            [home_score, away_score, home_team]
          ),
          connection.promise().execute(
            'UPDATE teams SET wins = wins + 1, GF = GF + ?, GA = GA + ? WHERE teamName = ?',
            [away_score, home_score, away_team]
          )
        );
      } else {
        updates.push(
          connection.promise().execute(
            'UPDATE teams SET draws = draws + 1, GF = GF + ?, GA = GA + ? WHERE teamName = ?',
            [home_score, away_score, home_team]
          ),
          connection.promise().execute(
            'UPDATE teams SET draws = draws + 1, GF = GF + ?, GA = GA + ? WHERE teamName = ?',
            [away_score, home_score, away_team]
          )
        );
      }

      await Promise.all(updates);
    }

    // Finally, update match table with new score
    await connection.promise().execute(
      'UPDATE matches SET home_score = ?, away_score = ? WHERE id_match = ?',
      [home_score, away_score, id]
    );

    res.json({ message: 'Match result updated successfully' });

  } catch (err) {
    console.error('Error updating match score:', err.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Could not update match score' 
    });
  }
});



// Get all matches endpoint
app.get('/matches', (req, res) => {
  connection.execute('SELECT * FROM matches', (err, results) => {
    if (err) {
      console.error('Matches query error:', err.message);
      return res.status(500).json({ 
        error: 'Matches retrieval failed',
        message: 'Could not retrieve match list. Please try again later.'
      });
    }
    res.json(results);
  });
});


app.post('/generate-matches', async (req, res) => {
  const { round } = req.body;

  const allowedRounds = ['LP', 'PO', 'R16', 'QF', 'SF'];
  if (!allowedRounds.includes(round)) {
    return res.status(400).json({
      error: 'Invalid round value',
      message: `Unsupported round: ${round}`
    });
  }

  const connection = await pool.getConnection();

  try {
    // 1. Delete old matches
    await connection.execute(`DELETE FROM matches WHERE round LIKE ?`, [`${round}%`]);

    // 2. Reset team stats (if LP)
    if (round === 'LP') {
      await connection.execute('UPDATE teams SET wins = 0, losses = 0, draws = 0, GF = 0, GA = 0');
    }

    // 3. Fetch teams
    const [allTeams] = await connection.execute('SELECT * FROM teams');
    let pot1 = [], pot2 = [];

    if (round !== 'LP') {
      const [qualifiedTeams] = await connection.execute(
        'SELECT * FROM teams WHERE userName IN (SELECT qualified FROM matches WHERE round = ?)',
        [round]
      );
      pot1 = qualifiedTeams;
    }

    pot2 = allTeams;

    if (pot1.length === 0 && pot2.length === 0) {
      return res.status(400).json({
        error: 'No teams available',
        message: 'Cannot generate matches without any registered teams'
      });
    }

    // 4. Generate matches
    let matches;
    const gws = 8;

    switch (round) {
      case 'LP':
        matches = generateMatches(pot2, gws);
        break;
      case 'PO':
        matches = generatePoMatches(pot2);
        break;
      case 'R16':
        matches = generateR16matches(pot1, pot2);
        break;
      case 'QF':
        matches = generateQFmatches(pot1);
        break;
      case 'SF':
        // You can add custom logic for SF here
        return res.status(400).json({
          error: 'Not implemented',
          message: 'SF match generation is not implemented yet'
        });
      default:
        return res.status(400).json({
          error: 'Unsupported round',
          message: `No generation logic defined for round ${round}`
        });
    }

    if (!matches || matches.length === 0) {
      return res.status(500).json({
        error: 'Match generation error',
        message: 'Match generation returned no data'
      });
    }

    // 5. Insert matches
    const insertQuery = `
      INSERT INTO matches 
      (id_match, home_team, hometeam_name, home_score, away_team, awayteam_name, away_score, round) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertPromises = matches.map(match =>
      connection.execute(insertQuery, [
        match.id_match,
        match.home_team.userName,
        match.home_team.teamName,
        match.home_score,
        match.away_team.userName,
        match.away_team.teamName,
        match.away_score,
        match.round
      ])
    );

    await Promise.all(insertPromises);

    res.json({
      message: 'Matches generated successfully',
      generatedMatches: matches.length,
      rounds: gws
    });

  } catch (err) {
    console.error('Match generation error:', err.message);
    res.status(500).json({
      error: 'Match generation failed',
      message: err.message
    });
  } finally {
    connection.release();
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'An unexpected error occurred. Please try again later.'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});