const db = require('../config/db');

const Team = {
  getTeamsAll: (callback) => {
    db.query('SELECT * FROM teams ORDER BY teamName ASC', callback);
  },
  getQualfiedTeamsFrom : (round , callback)=>{
    db.query('SELECT * FROM teams where userName in (select qualified from matches where round = ?)',[round],callback)
  },
  getTeams: (callback) => {
    db.query('SELECT * FROM teams', callback);
  },
  register: (values, callback) => {
    db.query('INSERT INTO teams (teamName, phoneNum, userName) VALUES (?, ?, ?)', values, callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM teams WHERE userName = ?', [id], callback);
  },

  update: (values, callback) => {
    db.query('UPDATE teams SET teamName = ?, phoneNum = ? WHERE userName = ?', values, callback);
  },

  updateTeamStats: (round, matchStat, values, callback) => {
    if (round === 'LP') {
      let query = '';
      switch (matchStat) {
        case 'w':
          query = 'UPDATE teams SET wins = wins + 1, GF = GF + ?, GA = GA + ? WHERE userName = ?';
          break;
        case 'l':
          query = 'UPDATE teams SET losses = losses + 1, GF = GF + ?, GA = GA + ? WHERE userName = ?';
          break;
        case 'd':
          query = 'UPDATE teams SET draws = draws + 1, GF = GF + ?, GA = GA + ? WHERE userName = ?';
          break;
        default:
          return callback(null);
      }
      db.query(query, values, callback);
    } else {
      const query = 'UPDATE teams SET KOGF = KOGF + ?, KOGA = KOGA + ? WHERE userName = ?';
      db.query(query, values, callback);
    }
  },

  initializeTeamStats: (callback) => {
    db.query(
      'UPDATE teams SET wins = 0, losses = 0, draws = 0, GF = 0, GA = 0, KOGF = 0, KOGA = 0',
      callback
    );
  },

  applySanction : (team , pts , callback)=>{
    db.query('UPDATE teams set sanction = sanction + ? where userName = ?' ,  [pts , team] ,  callback)
  }
};

module.exports = Team;
