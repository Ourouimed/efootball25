const db = require('../config/db');

exports.getAllMatches =  (req , res)=>{
    db.query('SELECT * FROM matches', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
    })
}