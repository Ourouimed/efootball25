import Settings from '../models/Settings.js';

// === Get settings ===
const getSettings = async (req, res) => {
  try {
    const [settings] = await Settings.getAllSettings();
    res.json(settings);
  } catch (err) {
    console.error('getSettings error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// === Update settings ===
const setSettings = async (req, res) => {
  try {
    const { currentRound, totalGws, deadlineDate, registerIsOpen } = req.body;
    console.log('Updating settings:', req.body);

    await Settings.setAllSettings(deadlineDate, currentRound, registerIsOpen, totalGws);
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    console.error('setSettings error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getSettings, setSettings };
