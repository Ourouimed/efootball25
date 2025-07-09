const db = require('../config/db');

const Match = {
  getMatchesAll: (callback) => {
    db.query('SELECT * FROM matches', callback);
  },

  deleteMatchesByRound: (round, callback) => {
    if (round === 'LP') {
      db.query("DELETE FROM matches", callback);
    } else {
      db.query('DELETE FROM matches WHERE round = ?', [round], callback);
    }
  },

  getMatchesByRound: (round, callback) => {
    if (round === 'LP') {
      db.query("SELECT * FROM matches WHERE round LIKE 'gw%'", callback);
    } else {
      db.query('SELECT * FROM matches WHERE round = ?', [round], callback);
    }
  },

  insertMatches: (values, callback) => {
    db.query(
      'INSERT INTO matches (id_match, home_team, hometeam_name, away_team, awayteam_name, round) VALUES ?',
      [values],
      callback
    );
  },

  getMatchByid: (id, callback) => {
    db.query('SELECT * FROM matches WHERE id_match = ?', [id], callback);
  },

  // Updated version: supports optional 'qualified'
  updateMatch: (id, values, callback) => {
    const [home_score, away_score, qualified] = values;

    if (qualified !== undefined) {
      // If 'qualified' is provided, include it in the query
      db.query(
        'UPDATE matches SET home_score = ?, away_score = ?, qualified = ?, played = 1 WHERE id_match = ?',
        [home_score, away_score, qualified, id],
        callback
      );
    } else {
      // Standard update without qualified
      db.query(
        'UPDATE matches SET home_score = ?, away_score = ?, played = 1 WHERE id_match = ?',
        [home_score, away_score, id],
        callback
      );
    }
  },
};

module.exports = Match;
