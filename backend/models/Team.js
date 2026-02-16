import db from '../config/db.js';

const Team = {
  getTeamsAll: async () => {
    const [rows] = await db.query(
      'SELECT * FROM teams ORDER BY teamName ASC'
    );
    return rows;
  },


  inistializeStanding : async (teams)=>{
      await db.query('DELETE FROM standing');

      const values = teams.map(team => [
        team.userName, 0, 0, 0, 0, 0,0 
      ]);


      const sql = `INSERT INTO standing
          (id_team, wins, draws, losses, GF, GA, sanction) VALUES ?`;

      const result =db.query(sql , [values])
      return result
  }, 

  getStanding: async () => {
    const [rows] = await db.query(
      `SELECT s.* , t.teamName FROM standing s 
      inner join teams t on s.id_team = t.userName 
      ORDER BY teamName ASC`
    );
    return rows;
  },

  getQualfiedTeamsFrom: async (round) => {
    const [rows] = await db.query(
      'SELECT * FROM teams WHERE userName IN (SELECT qualified FROM matches WHERE round = ?)',
      [round]
    );
    return rows;
  },

  getTeams: async () => {
    const [rows] = await db.query('SELECT * FROM teams');
    return rows;
  },

  register: async (values) => {
    const [result] = await db.query(
      'INSERT INTO teams (teamName, phoneNum, userName) VALUES (?, ?, ?)',
      values
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query(
      'DELETE FROM teams WHERE userName = ?',
      [id]
    );
    return result;
  },

  update: async (values) => {
    const [result] = await db.query(
      'UPDATE teams SET teamName = ?, phoneNum = ? WHERE userName = ?',
      values
    );
    return result;
  },

  updateTeamStats: async (round, matchStat, values) => {
    if (round === 'LP') {
      let query = '';

      switch (matchStat) {
        case 'w':
          query =
            'UPDATE standing SET wins = wins + 1, GF = GF + ?, GA = GA + ? WHERE id_team = ?';
          break;
        case 'l':
          query =
            'UPDATE standing SET losses = losses + 1, GF = GF + ?, GA = GA + ? WHERE id_team = ?';
          break;
        case 'd':
          query =
            'UPDATE standing SET draws = draws + 1, GF = GF + ?, GA = GA + ? WHERE id_team = ?';
          break;
        default:
          return null;
      }

      const [result] = await db.query(query, values);
      return result;
    } else {
      const [result] = await db.query(
        'UPDATE teams SET KOGF = KOGF + ?, KOGA = KOGA + ? WHERE userName = ?',
        values
      );
      return result;
    }
  },

  initializeTeamStats: async () => {
    const [result] = await db.query(
      'UPDATE standing SET wins = 0, losses = 0, draws = 0, GF = 0, GA = 0, KOGF = 0, KOGA = 0'
    );
    return result;
  },

  applySanction: async (team, pts) => {
    const [result] = await db.query(
      'UPDATE teams SET sanction = sanction + ? WHERE userName = ?',
      [pts, team]
    );
    return result;
  },
};

export default Team;
