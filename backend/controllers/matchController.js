import Match from '../models/Match.js';
import Team from '../models/Team.js';
import { getMatchResult } from '../utils/getMatchResult.js';

const getAllMatches = async (req, res) => {
  try {
    const results = await Match.getMatchesAll();
    res.json(results);

  } catch (err) {
    console.error('getAllMatches error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMatch = async (req, res) => {
  const { id } = req.params;
  const { home_score, away_score } = req.body;

  try {

    if (!home_score || !away_score){
      return res.status(400).json({error : 'Required fields missing!!'})
    }

    const match = await Match.getMatchById(id) 
    const {
      round,
      home_team,
      away_team,
      home_score: home_old_score,
      away_score: away_old_score
    } = match;

    const isLeaguePhase = round.toLowerCase().startsWith("gw"); 
    if (!match){
      return res.status(404).json({error : 'Match unfound'})
    }


    // reset old score if exists
    if (away_old_score !== null && home_old_score !== null){
      if (isLeaguePhase){
          const oldHomeRes = getMatchResult(home_old_score , away_old_score)
          const oldAwayRes = getMatchResult(away_old_score , home_old_score)

          
          await Team.resetMatchFromTeamStats('LP' , oldHomeRes , [home_old_score , away_old_score , home_team])
          await Team.resetMatchFromTeamStats('LP' , oldAwayRes , [away_old_score , home_old_score , away_team])
      }
      else {
          await Team.resetMatchFromTeamStats(round , null , [home_old_score , away_old_score , home_team])
          await Team.resetMatchFromTeamStats(round , null , [away_old_score , home_old_score , away_team])
      }
    }


      if (isLeaguePhase){
          const HomeRes = getMatchResult(home_score , away_score)
          const AwayRes = getMatchResult(away_score , home_score)

          await Team.updateTeamStats('LP' , HomeRes , [home_score , away_score , home_team])
          await Team.updateTeamStats('LP' , AwayRes , [away_score , home_score , away_team]) 

          // update match score 
          await Match.updateMatch(id , {home_score , away_score })
      }
      else {
          // determine qualified team
          let qualified = null;
          if (home_score > away_score) qualified = home_team;
          else if (away_score > home_score) qualified = away_team;

          // update team stats 
          await Team.updateTeamStats(round , null , [home_score , away_score , home_team])
          await Team.updateTeamStats(round , null , [away_score , home_score , away_team]) 

          //update match score 
          await Match.updateMatch(id , {home_score , away_score , qualified})
      }


       res.json({ message: "Match updated successfully" });
  }
  catch (err) {
    console.error('updateMatch error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllMatches, updateMatch };
