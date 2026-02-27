import Match from '../models/Match.js';
import Settings from '../models/Settings.js';
import Team from '../models/Team.js';
import { getMatchResult } from '../utils/getMatchResult.js';
import { sendWtsp } from '../utils/sendWhatsapp.js';

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
    const { registerIsOpen , whatsapp_url} = settings[0];

    if (!registerIsOpen) {
      return res.status(400).json({ error: 'Registration form is closed' });
    }

const messageToSend = `
🎮 *eFootball Tournament 2026*

🇲🇦 مرحباً ${teamName}!

تم تسجيل فريقكم بنجاح ✅  
للانضمام إلى مجموعة واتساب الرسمية للبطولة اضغط على الرابط التالي 👇
${whatsapp_url}

📊 تتبعوا الإحصائيات والنتائج من هنا:
https://efootball26-league.vercel.app/stats

نتمنى لكم التوفيق في المنافسة 🔥⚽

🇬🇧 Welcome ${teamName}!

Your team has been successfully registered ✅  
Join the official WhatsApp group here 👇
${whatsapp_url}

📊 Check stats and results here:
https://efootball26-league.vercel.app/stats

Good luck in the competition 🔥⚽
`;


    await Team.register([teamName, phoneNum, userName]);
    await sendWtsp(phoneNum , messageToSend)
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


// Get Standing 

const getStanding = async (req, res) => {
  try {
    const results = await Team.getStanding();
    res.json(results);
  } catch (err) {
    console.error('getAllteams error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const calculatePoints = async (req , res)=>{
  try {
      const matches = await Match.getMatchesAll()
      const LPmatches = matches.filter(m => m.round.startsWith('GW'))
      const KOmatches = matches.filter(m => !m.round.startsWith('GW'))
      // reset all team stats to 0
      await Team.initializeTeamStats()

      for (const m of LPmatches){
          // get each team match res (W , L , D)
          if (m.home_score !== null && m.away_score !== null) {
            const homeResult = getMatchResult(m.home_score , m.away_score)
            const awayResult = getMatchResult(m.away_score , m.home_score)

            await Team.updateTeamStats('LP' , homeResult , [m.home_score , m.away_score , m.home_team])
            await Team.updateTeamStats('LP' , awayResult , [m.away_score , m.home_score , m.away_team])
          }
      }

      for (const m of KOmatches){
          // get each team match res (W , L , D)
          if (m.home_score !== null && m.away_score !== null) {
            await Team.updateTeamStats('KO' , null , [m.home_score , m.away_score , m.home_team])
            await Team.updateTeamStats('KO' , null , [m.away_score , m.home_score , m.away_team])
          }
      }
      
      return res.json({message : 'Team stats recalculated successfully'})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 

export { registerTeam, UpdateTeam, getAllteams, setSanction, DeleteTeam , getStanding , calculatePoints};
