const db = require('../config/db');
const Match = {
    getMatchesAll :  (callback)=>{
        db.query('SELECT * FROM matches' , callback)
    },
    deleteMatchesByRound : (round , callback)=>{
        if (round === 'LP'){
            db.query("DELETE FROM matches WHERE round like 'gw%'" , [round] , callback)
        }
        else {
            db.query('DELETE FROM matches WHERE round = ?' , [round] , callback)
        }
    },
    getMatchesByRound :(round , callback)=>{
        if (round === 'LP'){
            db.query("SELECT * FROM matches WHERE round like 'gw%'" , [round] , callback)
        }
        else {
            db.query('SELECT * FROM matches WHERE round = ?' , [round] , callback)
        }
    },
    insertMatches: (values, callback) => {
        db.query(
          'INSERT INTO matches (id_match, home_team, hometeam_name, away_team, awayteam_name, round) VALUES ?',
          [values],
          callback
        );
    },
    getMatchByid : (id , callback)=>{
        db.query('select * from matches where id_match = ?' , [id] , callback)
    },
    updateMatch : (id , values , callback)=>{
        db.query('UPDATE matches SET home_score = ? , away_score = ? , played = 1 WHERE id_match = ?' , [...values , id] , callback)
    },
}

module.exports = Match