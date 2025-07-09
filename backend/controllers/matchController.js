const db = require('../config/db');
const Match = require('../models/Match');
const Team = require('../models/Team');

exports.getAllMatches = (req, res) => {
  Match.getMatchesAll((err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};

exports.updateMatch = (req, res) => {
  const { id } = req.params;
  const { home_score, away_score } = req.body;

  Match.getMatchByid(id, (err, match) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (!match || match.length === 0) return res.status(404).json({ error: 'Match not found' });

    const { round, home_team, away_team } = match[0];

    // Determine if it's League Phase or Knockout Phase
    const isLeaguePhase = round.toLowerCase().startsWith('gw');

    if (isLeaguePhase) {
      // LP: Update match without 'qualified'
      Match.updateMatch(id, [home_score, away_score], (err) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });

        Match.getMatchesByRound('LP', (err, matches) => {
          if (err) return res.status(500).json({ error: 'Internal Server Error' });

          Team.initializeTeamStats((err) => {
            if (err) return res.status(500).json({ error: 'Failed to initialize team stats' });

            let completed = 0;

            matches.forEach(({ home_score, away_score, home_team, away_team }) => {
              if (home_score !== null && away_score !== null) {
                let homeStat, awayStat;

                if (home_score > away_score) {
                  homeStat = ['w', [home_score, away_score, home_team]];
                  awayStat = ['l', [away_score, home_score, away_team]];
                } else if (home_score < away_score) {
                  homeStat = ['l', [home_score, away_score, home_team]];
                  awayStat = ['w', [away_score, home_score, away_team]];
                } else {
                  homeStat = ['d', [home_score, away_score, home_team]];
                  awayStat = ['d', [away_score, home_score, away_team]];
                }

                Team.updateTeamStats('LP', homeStat[0], homeStat[1], (err) => {
                  if (err) return res.status(500).json({ error: 'Error updating home team' });

                  Team.updateTeamStats('LP', awayStat[0], awayStat[1], (err) => {
                    if (err) return res.status(500).json({ error: 'Error updating away team' });

                    completed++;
                    if (completed === matches.length) {
                      return res.json({ message: 'Match updated (LP) and team stats recalculated' });
                    }
                  });
                });
              } else {
                completed++;
                if (completed === matches.length) {
                  return res.json({ message: 'Match updated (LP) with some unplayed matches' });
                }
              }
            });
          });
        });
      });

    } else {
      const homeValues = [home_score, away_score, home_team];
      const awayValues = [away_score, home_score, away_team];

      let qualified = null;
      if (home_score > away_score) qualified = home_team;
      else if (away_score > home_score) qualified = away_team;

      
      Match.updateMatch(id, [home_score, away_score, qualified], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update match' });

        Team.updateTeamStats(round, null, homeValues, (err) => {
          if (err) return res.status(500).json({ error: 'Failed updating KO stats (home)' });

          Team.updateTeamStats(round, null, awayValues, (err) => {
            if (err) return res.status(500).json({ error: 'Failed updating KO stats (away)' });

            return res.json({ message: 'Match updated (KO), stats and qualification set' });
          });
        });
      });
    }
  });
};
