const db = require('../config/db');
const Match = {
    getMatchesAll :  (callback)=>{
        db.query('SELECT * FROM matches' , callback)
    },
    deleteMatchByRound : (round , callback)=>{
        if (round.startsWith('gw')){
            db.query("DELETE FROM matches WHERE round like 'gw%'" , [round] , callback)
        }
        else {
            db.query('DELETE FROM matches WHERE round = ?' , [round] , callback)
        }
    },
    insertMatches : (values , callback)=>{
        db.query('INSERT INTO matches (id_match, home_team, hometeam_name, away_team, awayteam_name, round) VALUES ?' , [values] , callback)
    }

}

module.exports = Match