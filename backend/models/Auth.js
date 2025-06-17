const db = require('../config/db');


const Auth = {
    createSession : ([userId, randomSessionId] , callback)=>{
        db.query('INSERT INTO session (id_session, id_user) VALUES (?,?)', [randomSessionId , userId] , callback)
    },
    login : ([id , password] , callback)=>{
        db.query('SELECT * FROM users WHERE id = ? AND password = ? ', [id , password] , callback)
    },
    verifysess : ([id, sessionCode] , callback)=>{
        db.query('SELECT S.*, U.role FROM session S INNER JOIN users U ON S.id_user = U.id WHERE id_user = ? AND id_session = ?' , [id, sessionCode] , callback)
    },
    logout : ([id, sessionCode] ,callback)=>{
        db.query('DELETE FROM session WHERE id_user = ? AND id_session = ?' , [id, sessionCode] , callback)
    }
}
module.exports = Auth