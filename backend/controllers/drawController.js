const Match = require('../models/Match');
const Team = require('../models/Team');
const { generateLPmatches  , generatePomatches} = require('../utils/matchGenerator');

exports.generateDraw = (req, res) => {
    const { round } = req.body;
    console.log(round)
    switch (round) {
        case 'LP':
            Team.getTeamsAll((err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Server Error (teams)' });
                    
                }

                const matches = generateLPmatches(result);
                

                
                Match.deleteMatchesByRound(round , (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Server Error (delete)' });
                    }


                    const values = matches.map(match => [
                        match.id_match,
                        match.home_team,
                        match.hometeam_name,
                        match.away_team,
                        match.awayteam_name,
                        match.round
                    ]);

                    Match.insertMatches(values, (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({ error: 'Server Error (insert)' });
                        }
                        res.json(matches);
                    });
                });
            });
            break;
        case 'PO':
            Team.getTeamsAll((err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Server Error (teams)' });    
                }

                let poTeams = result.slice(8,24)
                const matches = generatePomatches(poTeams);
                

                
                Match.deleteMatchesByRound(round , (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Server Error (delete)' });
                    }


                    const values = matches.map(match => [
                        match.id_match,
                        match.home_team,
                        match.hometeam_name,
                        match.away_team,
                        match.awayteam_name,
                        match.round
                    ]);

                    Match.insertMatches(values, (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({ error: 'Server Error (insert)' });
                        }
                        res.json(matches);
                    });
                });
            });
            break;
        default:
            console.log('err 3')
            res.status(400).json({ error: 'Unknown Round' });
    }
};
