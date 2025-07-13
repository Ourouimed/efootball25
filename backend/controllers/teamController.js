const Settings = require('../models/Settings');
const Team = require('../models/Team');
const axios = require('axios');

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

exports.registerTeam = (req , res) => {
  const { teamName, phoneNum, userName } = req.body;

  Settings.getAllSettings((err, results) => {
    if (err){
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const { registerIsOpen } = results[0];
    if (!registerIsOpen){
      return res.status(400).json({ error: 'Registration form is closed' });
    }

    Team.register([teamName, phoneNum, userName], async (err, results) => {
      if (err){
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      

      res.json({ message: 'Team registered successfully' });
    });
  });
};


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


exports.setSanction = (req, res) => {
  const { userName } = req.params;
  const { points } = req.body;

  if (!userName || typeof points !== 'number' || points <= 0) {
    return res.status(400).json({ error: 'Bad request: invalid userName or points' });
  }

  Team.applySanction(userName, points, (err, results) => {
    if (err) {
      console.error('Error applying sanction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Sanction applied successfully' });
  });
};
