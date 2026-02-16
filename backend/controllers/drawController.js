import Match from '../models/Match.js';
import Settings from '../models/Settings.js';
import Team from '../models/Team.js';
import { generateLPmatches, generateR16matches, generateKoMatches } from '../utils/matchGenerator.js';

export const generateDraw = async (req, res) => {
  const { round } = req.body;
  console.log('Round:', round);

  try {
    let teams, matches, values;

    switch (round) {
      case 'LP':
        teams = await Team.getTeamsAll();
        const settRes = await Settings.getAllSettings();
        const { totalGws } = settRes[0];

        matches = generateLPmatches(teams, totalGws);

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.away_team,
          match.round,
        ]);


        await Team.inistializeStanding(teams);



        await Match.insertMatches(values);
        return res.json(matches);

      case 'PO':
        teams = await Team.getTeamsAll();

        // Calculate points and sort
        const poTeams = teams
          .map(team => ({
            ...team,
            pts: Number(team.wins) * 3 + Number(team.draws) * 1 - team.sanction,
          }))
          .sort((a, b) => b.pts - a.pts || b.GF - b.GA - (a.GF - a.GA))
          .slice(8, 24);

        matches = generateKoMatches(poTeams, 'PO');

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.hometeam_name,
          match.away_team,
          match.awayteam_name,
          match.round,
        ]);

        await Match.insertMatches(values);
        return res.json(matches);

      case 'R16':
        const allTeams = await Team.getTeamsAll();
        const qualifiedR16 = await Team.getQualfiedTeamsFrom('PO');

        const pot1 = qualifiedR16;
        const pot2 = allTeams
          .map(team => ({
            ...team,
            pts: Number(team.wins) * 3 + Number(team.draws) * 1 - team.sanction,
          }))
          .sort((a, b) => b.pts - a.pts || b.GF - b.GA - (a.GF - a.GA))
          .slice(0, 8);

        matches = generateR16matches(pot1, pot2);

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.hometeam_name,
          match.away_team,
          match.awayteam_name,
          match.round,
        ]);

        await Match.insertMatches(values);
        return res.json(matches);

      case 'QF':
        teams = await Team.getQualfiedTeamsFrom('R16');
        matches = generateKoMatches(teams, 'QF');

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.hometeam_name,
          match.away_team,
          match.awayteam_name,
          match.round,
        ]);

        await Match.insertMatches(values);
        return res.json(matches);

      case 'SF':
        teams = await Team.getQualfiedTeamsFrom('QF');
        matches = generateKoMatches(teams, 'SF');

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.hometeam_name,
          match.away_team,
          match.awayteam_name,
          match.round,
        ]);

        await Match.insertMatches(values);
        return res.json(matches);

      default:
        return res.status(400).json({ error: 'Unknown Round' });
    }
  } catch (err) {
    console.error('generateDraw error:', err);
    return res.status(500).json({
      error: 'Server Error',
      message: err.message || 'Failed to generate matches',
    });
  }
};
