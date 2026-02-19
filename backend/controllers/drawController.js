import Match from '../models/Match.js';
import Settings from '../models/Settings.js';
import Team from '../models/Team.js';
import { generateLPmatches, generateR32matches, generateKoMatches } from '../utils/matchGenerator.js';

export const generateDraw = async (req, res) => {
  const { round } = req.body;
  console.log(round);

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
          .slice(16, 48);

        matches = generateKoMatches(poTeams, 'PO');

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.away_team,
          match.round,
        ]);

        await Match.insertMatches(values);
        return res.json(matches);

      case 'R32':
        const allTeams = await Team.getTeamsAll();
        const qualifiedR32 = await Team.getQualfiedTeamsFrom('PO');

        const pot1 = qualifiedR32;
        const pot2 = allTeams
          .map(team => ({
            ...team,
            pts: Number(team.wins) * 3 + Number(team.draws) * 1 - team.sanction,
          }))
          .sort((a, b) => b.pts - a.pts || b.GF - b.GA - (a.GF - a.GA))
          .slice(0, 16);

        console.log(pot1.length)
        console.log(pot2.length)

        matches = generateR32matches(pot1, pot2);

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.away_team,
          match.round,
        ]);

        await Match.insertMatches(values);
        return res.json(matches);

      
      case 'R16':
        teams = await Team.getQualfiedTeamsFrom('R32');
        matches = generateKoMatches(teams, 'R16');

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.away_team,
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
          match.away_team,
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
          match.away_team,
          match.round,
        ]);

        await Match.insertMatches(values);
        return res.json(matches);

      case 'FINAL':
        teams = await Team.getQualfiedTeamsFrom('SF');
        matches = generateKoMatches(teams, 'FINAL');

        await Match.deleteMatchesByRound(round);

        values = matches.map(match => [
          match.id_match,
          match.home_team,
          match.away_team,
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
