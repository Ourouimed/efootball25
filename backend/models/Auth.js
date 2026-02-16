import db from '../config/db.js';

const Auth = {
  createSession: async (userId, randomSessionId) => {
    const [result] = await db.query(
      'INSERT INTO session (id_session, id_user) VALUES (?, ?)',
      [randomSessionId, userId]
    );
    return result;
  },

  login: async (id, password) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE id = ? AND password = ?',
      [id, password]
    );
    return rows[0] || null;
  },

  verifysess: async (id, sessionCode) => {
    const [rows] = await db.query(
      `SELECT S.*, U.role 
       FROM session S 
       INNER JOIN users U ON S.id_user = U.id 
       WHERE S.id_user = ? AND S.id_session = ?`,
      [id, sessionCode]
    );
    return rows[0] || null;
  },

  logout: async (id, sessionCode) => {
    const [result] = await db.query(
      'DELETE FROM session WHERE id_user = ? AND id_session = ?',
      [id, sessionCode]
    );
    return result;
  }
};

export default Auth;
