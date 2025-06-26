const db = require("../config/db")

const Settings = {
    getAllSettings : (callback)=>{
        db.query('select * from settings' , callback)
    },
    setAllSettings : (values , callback)=>{
        db.query('UPDATE settings set deadlineDate = ? , currentRound = ? , registerIsOpen = ? ,  totalGws = ?' , values , callback)
    }
}

module.exports = Settings