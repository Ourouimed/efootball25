const Match = require('../models/Match');

exports.getAllMatches =  (req , res)=>{
  Match.getMatchesAll((err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
  })
}