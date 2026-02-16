import Match from '../models/Match.js';
import Team from '../models/Team.js';

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
    const match = await Match.getMatchById(id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const { round, home_team, away_team } = match;

    // Determine if it's League Phase (LP) or Knockout Phase
    const isLeaguePhase = round.toLowerCase().startsWith('gw');

    if (isLeaguePhase) {
      // Update match without 'qualified'
      await Match.updateMatch(id, { home_score, away_score });

      const matches = await Match.getMatchesByRound('LP');

      // Reset team stats
      await Team.initializeTeamStats();

      // Update stats for each played match
      for (const m of matches) {
        if (m.home_score !== null && m.away_score !== null) {
          const homeStat =
            m.home_score > m.away_score
              ? ['w', [m.home_score, m.away_score, m.home_team]]
              : m.home_score < m.away_score
              ? ['l', [m.home_score, m.away_score, m.home_team]]
              : ['d', [m.home_score, m.away_score, m.home_team]];

          const awayStat =
            m.home_score > m.away_score
              ? ['l', [m.away_score, m.home_score, m.away_team]]
              : m.home_score < m.away_score
              ? ['w', [m.away_score, m.home_score, m.away_team]]
              : ['d', [m.away_score, m.home_score, m.away_team]];

          await Team.updateTeamStats('LP', homeStat[0], homeStat[1]);
          await Team.updateTeamStats('LP', awayStat[0], awayStat[1]);
        }
      }

      return res.json({ message: 'Match updated (LP) and team stats recalculated' });
    } else {
      // Knockout phase: calculate qualified team
      let qualified = null;
      if (home_score > away_score) qualified = home_team;
      else if (away_score > home_score) qualified = away_team;

      await Match.updateMatch(id, { home_score, away_score, qualified });

      const homeValues = [home_score, away_score, home_team];
      const awayValues = [away_score, home_score, away_team];

      await Team.updateTeamStats(round, null, homeValues);
      await Team.updateTeamStats(round, null, awayValues);

      return res.json({ message: 'Match updated (KO), stats and qualification set' });
    }
  } catch (err) {
    console.error('updateMatch error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllMatches, updateMatch };
