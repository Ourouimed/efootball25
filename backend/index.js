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
function generatedMatches(teams, totalRounds) {
  const matches = [];
  const numTeams = teams.length;
  
  // Check if we have enough teams
  if (numTeams < 2) {
    console.warn("Not enough teams to create matches.");
    return matches;
  }
  
  // Keep track of matches that have already been scheduled
  const matchupHistory = new Set();
  
  // Shuffle teams to randomize initial pairings
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  
  // Calculate maximum possible unique games between all teams
  const maxPossibleMatches = (numTeams * (numTeams - 1)) / 2;
  
  // Track which teams have BYEs in each round (for odd number of teams)
  const byeHistory = new Map();
  teams.forEach(team => byeHistory.set(team, 0));
  
  // For each round
  let matchIdCounter = 0;
  for (let round = 1; round <= totalRounds; round++) {
    // Reset match counter for each round to ensure unique IDs within the round
    let matchesInRoundCounter = 0;
    const roundMatches = [];
    const teamsInThisRound = new Set(shuffledTeams);
    
    // Try to create matches for this round
    while (teamsInThisRound.size >= 2) {
      // Find teams that can play against each other
      const remainingTeams = Array.from(teamsInThisRound);
      let foundMatch = false;
      
      // Try to find a legal match (teams that haven't played each other yet)
      for (let i = 0; i < remainingTeams.length - 1 && !foundMatch; i++) {
        const homeTeam = remainingTeams[i];
        
        for (let j = i + 1; j < remainingTeams.length; j++) {
          const awayTeam = remainingTeams[j];
          
          // Make sure teams aren't playing themselves
          if (homeTeam === awayTeam) continue;
          
          const matchupKey = [homeTeam, awayTeam].sort().join('vs');
          
          // If this matchup hasn't happened yet, create it
          if (!matchupHistory.has(matchupKey)) {
            matchIdCounter++;
            matchesInRoundCounter++;
            
            // Create match ID
            const matchId = `M${String(matchesInRoundCounter).padStart(3, '0')}-GW${String(round).padStart(2, '0')}`;
            
            // Add match to results
            roundMatches.push({
              id_match: matchId,
              home_team: homeTeam,
              away_team: awayTeam,
              home_score: null,
              away_score: null,
              round: `GW${round}`,
            });
            
            // Record this matchup
            matchupHistory.add(matchupKey);
            
            // Remove teams from available pool for this round
            teamsInThisRound.delete(homeTeam);
            teamsInThisRound.delete(awayTeam);
            
            foundMatch = true;
            break;
          }
        }
      }
      
      // If we couldn't find a legal match, we'll have to assign a BYE 
      // (only happens with odd number of teams or when all remaining teams have played each other)
      if (!foundMatch && teamsInThisRound.size > 0) {
        // Find the team with the fewest BYEs
        let minByes = Infinity;
        let teamForBye = null;
        
        for (const team of teamsInThisRound) {
          const byeCount = byeHistory.get(team);
          if (byeCount < minByes) {
            minByes = byeCount;
            teamForBye = team;
          }
        }
        
        if (teamForBye) {
          matchesInRoundCounter++;
          
          // Create BYE match ID
          const byeId = `BYE${String(matchesInRoundCounter).padStart(3, '0')}-GW${String(round).padStart(2, '0')}`;
          
          // Add BYE to results
          roundMatches.push({
            id_match: byeId,
            home_team: teamForBye,
            away_team: "BYE",
            home_score: null,
            away_score: null,
            round: `GW${round}`,
          });
          
          // Update BYE history and remove team from available pool
          byeHistory.set(teamForBye, byeHistory.get(teamForBye) + 1);
          teamsInThisRound.delete(teamForBye);
        }
      }
    }
    
    // Add all matches from this round to our results
    matches.push(...roundMatches);
    
    // If we've scheduled all possible unique matches, stop
    if (matchupHistory.size >= maxPossibleMatches) {
      console.log(`All possible unique matches have been scheduled after round ${round}.`);
      break;
    }
  }
  
  // Validate the final schedule
  validateMatchSchedule(matches, teams);
  
  return matches;
}

// Function to validate the generated schedule
function validateMatchSchedule(matches, teams) {
  // Check for duplicate matches
  const seenMatchups = new Set();
  const seenIds = new Set();
  
  for (const match of matches) {
    // Skip BYE matches
    if (match.away_team === "BYE") continue;
    
    // Check for duplicate IDs
    if (seenIds.has(match.id_match)) {
      console.error(`Error: Duplicate match ID found: ${match.id_match}`);
    }
    seenIds.add(match.id_match);
    
    // Check for teams playing against themselves
    if (match.home_team === match.away_team) {
      console.error(`Error: Team ${match.home_team} is playing against itself in match ${match.id_match}`);
    }
    
    // Check for duplicate matchups
    const matchupKey = [match.home_team, match.away_team].sort().join('vs');
    if (seenMatchups.has(matchupKey)) {
      console.error(`Error: Duplicate matchup found: ${match.home_team} vs ${match.away_team}`);
    }
    seenMatchups.add(matchupKey);
  }
  
  // Check team participation in each round
  const roundsMap = new Map();
  for (const match of matches) {
    if (!roundsMap.has(match.round)) {
      roundsMap.set(match.round, new Set());
    }
    roundsMap.get(match.round).add(match.home_team);
    if (match.away_team !== "BYE") {
      roundsMap.get(match.round).add(match.away_team);
    }
  }
  
  // Make sure each team is in each round (unless there are BYEs)
  for (const [round, teamsInRound] of roundsMap.entries()) {
    if (teams.length % 2 === 0) {
      // For even number of teams, all teams should play in each round
      if (teamsInRound.size !== teams.length) {
        console.error(`Error: Not all teams are playing in ${round}. Expected ${teams.length}, got ${teamsInRound.size}`);
      }
    } else {
      // For odd number of teams, all but one team should play in each round
      if (teamsInRound.size !== teams.length - 1 && teamsInRound.size !== teams.length) {
        console.error(`Error: Wrong number of teams playing in ${round}. Expected ${teams.length - 1} or ${teams.length}, got ${teamsInRound.size}`);
      }
    }
  }
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

  // connection.execute(
  //   'INSERT INTO teams (userName, teamName, phoneNum) VALUES (?, ?, ?)', 
  //   [userName, teamName, phoneNum], 
  //   (err, results) => {
  //     if (err) {
  //       if (err.code === 'ER_DUP_ENTRY') {
  //         return res.status(409).json({ 
  //           error: 'Duplicate entry',
  //           message: 'This username is already registered'
  //         });
  //       }
  //       console.error('Database insertion error:', err.message);
  //       return res.status(500).json({ 
  //         error: 'Database operation failed',
  //         message: 'Could not register the team. Please try again later.'
  //       });
  //     }
  //     res.json({ 
  //       message: 'Team registered successfully!', 
  //       teamId: results.insertId 
  //     });
  //   }
  // );
  res.json({
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

// Match score update endpoint
app.post('/matches/:id', (req, res) => {
  const { id } = req.params;
  const { home_score, away_score } = req.body;

  // Validate scores
  if (home_score === undefined || away_score === undefined) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Both home_score and away_score are required'
    });
  }

  // Get the old match data
  connection.execute(
    'SELECT * FROM matches WHERE id_match = ?', 
    [id], 
    (err, [oldMatch]) => {
      if (err) {
        console.error('Match lookup error:', err.message);
        return res.status(500).json({ 
          error: 'Match lookup failed',
          message: 'Could not retrieve match information. Please try again later.'
        });
      }
      
      if (!oldMatch) {
        return res.status(404).json({ 
          error: 'Match not found',
          message: 'No match found with the specified ID'
        });
      }

      const { home_team, away_team, home_score: old_home, away_score: old_away } = oldMatch;

      // If there was an old score, revert its effect
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

        // Execute updates in parallel
        Promise.all([
          new Promise((resolve, reject) => {
            connection.execute(
              `UPDATE teams SET GF = GF - ?, GA = GA - ?, ${oldHomeUpdate} WHERE userName = ?`,
              [old_home, old_away, home_team],
              (err) => err ? reject(err) : resolve()
            );
          }),
          new Promise((resolve, reject) => {
            connection.execute(
              `UPDATE teams SET GF = GF - ?, GA = GA - ?, ${oldAwayUpdate} WHERE userName = ?`,
              [old_away, old_home, away_team],
              (err) => err ? reject(err) : resolve()
            );
          })
        ]).catch(err => {
          console.error('Error reverting old scores:', err.message);
          return res.status(500).json({ 
            error: 'Score update failed',
            message: 'Could not revert previous scores. Changes were not applied.'
          });
        });
      }

      // Update the match score
      connection.execute(
        'UPDATE matches SET home_score = ?, away_score = ? WHERE id_match = ?',
        [home_score, away_score, id],
        (err, results) => {
          if (err) {
            console.error('Match update error:', err.message);
            return res.status(500).json({ 
              error: 'Match update failed',
              message: 'Could not update match scores. Please try again later.'
            });
          }

          // If the new score is valid, apply new stats
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

            // Execute updates in parallel
            Promise.all([
              new Promise((resolve, reject) => {
                connection.execute(
                  `UPDATE teams SET GF = GF + ?, GA = GA + ?, ${newHomeUpdate} WHERE userName = ?`,
                  [home_score, away_score, home_team],
                  (err) => err ? reject(err) : resolve()
                );
              }),
              new Promise((resolve, reject) => {
                connection.execute(
                  `UPDATE teams SET GF = GF + ?, GA = GA + ?, ${newAwayUpdate} WHERE userName = ?`,
                  [away_score, home_score, away_team],
                  (err) => err ? reject(err) : resolve()
                );
              })
            ]).catch(err => {
              console.error('Error applying new scores:', err.message);
              return res.status(500).json({ 
                error: 'Score update failed',
                message: 'Match score was updated but team statistics might be inconsistent.'
              });
            });
          }

          res.json({ 
            message: 'Match score and team stats updated successfully',
            matchId: id,
            newScores: { home_score, away_score }
          });
        }
      );
    }
  );
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

// Match generation endpoint
app.post('/generate-matches', (req, res) => {
  // 1. Clear existing matches
  connection.execute('DELETE FROM matches', (err) => {
    if (err) {
      console.error('Match deletion error:', err.message);
      return res.status(500).json({ 
        error: 'Match generation failed',
        message: 'Could not clear existing matches. No changes were made.'
      });
    }

    // 2. Reset team stats
    connection.execute(
      'UPDATE teams SET wins = 0, losses = 0, draws = 0, GF = 0, GA = 0',
      (err) => {
        if (err) {
          console.error('Stats reset error:', err.message);
          return res.status(500).json({ 
            error: 'Match generation failed',
            message: 'Could not reset team statistics. No changes were made.'
          });
        }

        // 3. Fetch teams
        connection.execute('SELECT * FROM teams', (err, results) => {
          if (err) {
            console.error('Teams query error:', err.message);
            return res.status(500).json({ 
              error: 'Match generation failed',
              message: 'Could not retrieve team list. No changes were made.'
            });
          }

          const teams = results;
          if (teams.length === 0) {
            return res.status(400).json({ 
              error: 'No teams available',
              message: 'Cannot generate matches without any registered teams'
            });
          }

          const gws = 8;
          const matches = generatedMatches(teams, gws);

          const query = `
            INSERT INTO matches 
            (id_match, home_team, hometeam_name, home_score, away_team, awayteam_name, away_score, round) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;

          // Execute all match insertions in parallel
          Promise.all(
            matches.map(match => {
              return new Promise((resolve, reject) => {
                connection.execute(query, [
                  match.id_match,
                  match.home_team.userName,
                  match.home_team.teamName,
                  match.home_score,
                  match.away_team.userName,
                  match.away_team.teamName,
                  match.away_score,
                  match.round
                ], (err) => err ? reject(err) : resolve());
              });
            })
          ).then(() => {
            res.json({ 
              message: 'Matches generated successfully',
              generatedMatches: matches.length,
              rounds: gws
            });
          }).catch(err => {
            console.error('Match insertion error:', err.message);
            res.status(500).json({ 
              error: 'Match generation incomplete',
              message: 'Some matches might not have been generated properly'
            });
          });
        });
      }
    );
  });
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