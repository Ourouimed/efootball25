import db from "../config/db.js";

const Settings = {
  getAllSettings: async () => {
    const [rows] = await db.query("SELECT * FROM settings");
    return rows;
  },

  setAllSettings: async (values) => {
    const [result] = await db.query(
      "UPDATE settings SET deadlineDate = ?, currentRound = ?, registerIsOpen = ?, totalGws = ?",
      values
    );
    return result;
  },
};

export default Settings;
