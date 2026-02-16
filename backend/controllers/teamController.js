import Settings from '../models/Settings.js';
import Team from '../models/Team.js';

// === Get all teams ===
const getAllteams = async (req, res) => {
  try {
    const results = await Team.getTeamsAll();
    res.json(results);
  } catch (err) {
    console.error('getAllteams error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// === Register a new team ===
const registerTeam = async (req, res) => {
  const { teamName, phoneNum, userName } = req.body;

  try {
    const settings = await Settings.getAllSettings();
    console.log(settings)
    const { registerIsOpen } = settings[0];

    if (!registerIsOpen) {
      return res.status(400).json({ error: 'Registration form is closed' });
    }

    await Team.register([teamName, phoneNum, userName]);
    res.json({ message: 'Team registered successfully' });
  } catch (err) {
    console.error('registerTeam error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// === Delete a team ===
const DeleteTeam = async (req, res) => {
  const { userName } = req.params;

  try {
    const result = await Team.delete(userName);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    console.error('DeleteTeam error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// === Update a team ===
const UpdateTeam = async (req, res) => {
  const { userName } = req.params;
  const { teamName, phoneNum } = req.body;

  try {
    const result = await Team.update([teamName, phoneNum, userName]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ message: 'Team updated successfully' });
  } catch (err) {
    console.error('UpdateTeam error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// === Apply sanction to a team ===
const setSanction = async (req, res) => {
  const { userName } = req.params;
  const { points } = req.body;

  if (!userName || typeof points !== 'number' || points <= 0) {
    return res.status(400).json({ error: 'Bad request: invalid userName or points' });
  }

  try {
    const result = await Team.applySanction(userName, points);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ message: 'Sanction applied successfully' });
  } catch (err) {
    console.error('setSanction error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { registerTeam, UpdateTeam, getAllteams, setSanction, DeleteTeam };
