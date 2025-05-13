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
  // const { teamName, phoneNum, userName } = req.body;

  // if (!teamName || !phoneNum || !userName) {
  //   return res.status(400).json({ 
  //     error: 'Validation failed',
  //     message: 'All fields are required'
  //   });
  // }

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
  res.status(500).json({
    message : 'register form is closed please try again later'
  })
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
      'SELECT id_match, home_team, away_team, home_score, away_score, round FROM matches WHERE id_match = ?', [id]
    );
    const oldMatch = rows[0];

    if (!oldMatch) {
      return res.status(404).json({
        error: 'Match not found',
        message: 'No match found with the specified ID'
      });
    }

    const isGW = oldMatch.round && oldMatch.round.startsWith("GW");
    const { home_team, away_team, home_score: old_home, away_score: old_away } = oldMatch;

    // Revert old stats
    if (old_home !== null && old_away !== null) {
      if (isGW) {
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
      } else {
        await Promise.all([
          connection.promise().execute(
            `UPDATE teams SET KOGF = KOGF - ?, KOFA = KOFA - ? WHERE userName = ?`,
            [old_home, old_away, home_team]
          ),
          connection.promise().execute(
            `UPDATE teams SET KOGF = KOGF - ?, KOFA = KOFA - ? WHERE userName = ?`,
            [old_away, old_home, away_team]
          )
        ]);
      }
    }

    // Update match scores
    await connection.promise().execute(
      'UPDATE matches SET home_score = ?, away_score = ? WHERE id_match = ?',
      [home_score, away_score, id]
    );

    // Apply new stats
    if (home_score !== null && away_score !== null) {
      if (isGW) {
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
      } else {
        await Promise.all([
          connection.promise().execute(
            `UPDATE teams SET KOGF = KOGF + ?, KOFA = KOFA + ? WHERE userName = ?`,
            [home_score, away_score, home_team]
          ),
          connection.promise().execute(
            `UPDATE teams SET KOGF = KOGF + ?, KOFA = KOFA + ? WHERE userName = ?`,
            [away_score, home_score, away_team]
          )
        ]);
      }
    }

    res.json({
      message: 'Match score and team stats updated successfully',
      matchId: id,
      newScores: { home_score, away_score }
    });

  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({
      error: 'Update failed',
      message: 'Something went wrong while updating the match.'
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

  // Validate round
  if (!['LP', 'PO', 'R16', 'QF', 'SF'].includes(round)) {
    return res.status(400).json({
      error: 'Invalid round value',
      message: `Unsupported round: ${round}`
    });
  }

  // Helper to promisify DB queries
  const dbQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
      connection.execute(query, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  };

  try {
    // 1. Delete old matches
    round === 'LP' ? await dbQuery("DELETE FROM matches WHERE round LIKE 'GW%"): 
    await dbQuery('DELETE FROM matches WHERE round = ?', [round])
    

    // 2. Reset team stats (if LP)
    if (round === 'LP') {
      await dbQuery('UPDATE teams SET wins = 0, losses = 0, draws = 0, GF = 0, GA = 0');
    }

    // 3. Fetch teams
    let pot1 = [], pot2 = [];

    if (round !== 'LP') {
      // Get teams that qualified for this round
      pot1 = await dbQuery(
        'SELECT * FROM teams WHERE userName IN (SELECT qualified FROM matches WHERE round = ?)',
        [round]
      );
    }

    // Get all teams for LP, or the ones that qualified for knockout rounds
    if (round === 'LP' || pot1.length === 0) {
      pot2 = await dbQuery('SELECT * FROM teams');
    } else {
      pot2 = pot1; // If knockout round, use pot1 as pot2
    }

    if (pot1.length === 0 && pot2.length === 0) {
      return res.status(400).json({
        error: 'No teams available',
        message: 'Cannot generate matches without any registered teams'
      });
    }

    // 4. Generate matches
    let matches;
    const gws = 8; // This is specific to 'LP' round, adjust accordingly for others
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
        matches = generateSFmatches(pot1); // You can implement this
        break;
      default:
        return res.status(400).json({
          error: 'Invalid round',
          message: `Unsupported round: ${round}`
        });
    }

    if (!matches || matches.length === 0) {
      return res.status(500).json({
        error: 'Match generation error',
        message: 'Match generation returned no data'
      });
    }

    // 5. Insert matches into the database
    const insertQuery = `
      INSERT INTO matches 
      (id_match, home_team, hometeam_name, home_score, away_team, awayteam_name, away_score, round) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Inserting all matches
    await Promise.all(
      matches.map(match => {
        return new Promise((resolve, reject) => {
          connection.execute(insertQuery, [
            match.id_match,
            match.home_team.userName,
            match.home_team.teamName,
            match.home_score,
            match.away_team.userName,
            match.away_team.teamName,
            match.away_score,
            match.round
          ], (err) => {
            if (err) {
              console.error(`Insert error for match ${match.id_match}:`, err.message);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      })
    );

    // Success response
    res.json({
      message: 'Matches generated successfully',
      generatedMatches: matches.length,
      rounds: gws
    });

  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).json({
      error: 'Match generation failed',
      message: 'An error occurred while generating the matches'
    });
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