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
  const { teamName, phoneNum, userName } = req.body
  db.query('INSERT INTO teams (teamName, phoneNum, userName) VALUES (?, ?, ?)', [teamName, phoneNum, userName], (err, results) => {
    if(err){
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return
    }
      res.json({ message: 'Team registered successfully' });
    
  })
}

exports.DeleteTeam = (req ,res) =>{
  const {userName} = req.params
  db.query('delete from teams where userName = ?', [userName], (err, results) => {
    if(err){
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Team not found' });
    }
    else {
      res.json({ message: 'Team deleted successfully' });
    }
  })
}


exports.UpdateTeam = (req ,res) =>{
  const {userName} = req.params
  const {teamName , phoneNum} = req.body
  db.query('update teams set	teamName = ? , phoneNum = ? where userName = ?', [teamName , phoneNum , userName], (err, results) => {
    if(err){
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Team not found' });
    }
    else {
      res.json({ message: 'Team updated successfully' });
    }
  })
}