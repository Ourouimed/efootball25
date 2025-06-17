const db = require('../config/db');
const Team = {
    getTeamsAll : (callback)=>{
        db.query('SELECT * FROM teams' , callback)
    }
}

module.exports = Team