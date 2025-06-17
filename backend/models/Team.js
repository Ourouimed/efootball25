const db = require('../config/db');
const Team = {
    getTeamsAll : (callback)=>{
        db.query('SELECT * FROM teams order by teamName ASC' , callback)
    }
}

module.exports = Team