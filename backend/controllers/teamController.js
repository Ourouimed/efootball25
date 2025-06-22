const db = require('../config/db');
const Team = require('../models/Team');

exports.getAllteams =  (req , res)=>{
    Team.getTeamsAll((err, results) => {
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

  Team.register([teamName, phoneNum, userName] ,(err, results) => {
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
  Team.delete(userName ,(err, results) => {
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


  Team.update([teamName , phoneNum , userName] , (err, results) => {
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