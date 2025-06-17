const Auth = require('../models/Auth')
const { generateRandomCode } = require('../utils/sessionCodeGenerator');

exports.login = (req , res)=>{
  const { id, password } = req.body;
  
  if (!id || !password) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Both ID and password are required'
    });
  }

  Auth.login([id, password] , (err, results) => {
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

    Auth.createSession([user.id, randomSessionId] , (err, results) => {
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
    })

      
  
  })

    
  
}


exports.verifySession = (req , res)=>{
    const { id, sessionCode } = req.body;
  
  if (!id || !sessionCode) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Both user ID and session code are required'
    });
  }

  Auth.verifysess([id, sessionCode] , (err, results) => {
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
  })
    
  
  }


exports.logout = (req, res) => {
  const { id, sessionCode } = req.body;

  if (!id || !sessionCode) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Both user ID and session code are required'
    });
  }

  Auth.logout([id, sessionCode],(err, results) => {
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
}
