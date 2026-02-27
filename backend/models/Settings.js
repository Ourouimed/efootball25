import db from "../config/db.js";

const Settings = {
  // === Get all settings ===
  getAllSettings: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM settings");
      return rows;
    } catch (err) {
      console.error("getAllSettings error:", err);
      throw err;
    }
  },

  // === Insert or update settings ===
  setAllSettings: async (deadlineDate, currentRound, registerIsOpen, totalGws , whatsapp_url) => {
    try {
      const settings = await Settings.getAllSettings();
      if (!settings || settings.length === 0) {
        const [result] = await db.query(
          "INSERT INTO settings (deadlineDate, currentRound, registerIsOpen, totalGws , whatsapp_url) VALUES (?, ?, ?, ? , ?)",
          [deadlineDate, currentRound, registerIsOpen, totalGws , whatsapp_url]
        );
        return result;
      } else {
        const [result] = await db.query(
          "UPDATE settings SET deadlineDate = ?, currentRound = ?, registerIsOpen = ?, totalGws = ? , whatsapp_url = ?",
          [deadlineDate, currentRound, registerIsOpen, totalGws , whatsapp_url]
        );
        return result;
      }
    } catch (err) {
      console.error("setAllSettings error:", err);
      throw err;
    }
  },
};

export default Settings;
