import db from '../config/db.js';

const Match = {
  getMatchesAll: async () => {
    const [rows] = await db.query('SELECT * FROM matches');
    return rows;
  },

  deleteMatchesByRound: async (round) => {
    if (round === 'LP') {
      const [result] = await db.query('DELETE FROM matches');
      return result;
    } else {
      const [result] = await db.query(
        'DELETE FROM matches WHERE round = ?',
        [round]
      );
      return result;
    }
  },

  getMatchesByRound: async (round) => {
    if (round === 'LP') {
      const [rows] = await db.query(
        "SELECT * FROM matches WHERE round LIKE 'gw%'"
      );
      return rows;
    } else {
      const [rows] = await db.query(
        'SELECT * FROM matches WHERE round = ?',
        [round]
      );
      return rows;
    }
  },

  insertMatches: async (values) => {
    const [result] = await db.query(
      'INSERT INTO matches (id_match, home_team, hometeam_name, away_team, awayteam_name, round) VALUES ?',
      [values]
    );
    return result;
  },

  getMatchById: async (id) => {
    const [rows] = await db.query(
      'SELECT * FROM matches WHERE id_match = ?',
      [id]
    );
    return rows[0] || null;
  },

  updateMatch: async (id, values) => {
    const [home_score, away_score, qualified] = values;

    if (qualified !== undefined) {
      const [result] = await db.query(
        'UPDATE matches SET home_score = ?, away_score = ?, qualified = ?, played = 1 WHERE id_match = ?',
        [home_score, away_score, qualified, id]
      );
      return result;
    } else {
      const [result] = await db.query(
        'UPDATE matches SET home_score = ?, away_score = ?, played = 1 WHERE id_match = ?',
        [home_score, away_score, id]
      );
      return result;
    }
  },
};

export default Match;
