const db = require('../config/db');

exports.getAllteams =  (req , res)=>{
    db.query('SELECT * FROM teams', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
    })
}


exports.registerTeam = (req , res) =>{
    
}