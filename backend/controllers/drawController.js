const Match = require('../models/Match');
const Settings = require('../models/Settings');
const Team = require('../models/Team');
const { generateLPmatches  , generatePomatches, generateR16matches, generateQFmatches} = require('../utils/matchGenerator');

exports.generateDraw = (req, res) => {
    const { round } = req.body;
    console.log(round)
    switch (round) {
        case 'LP':
            Team.getTeamsAll((err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Server Error (teams)' });
                    
                }
                
               
                

                Settings.getAllSettings((err , settRes)=>{
                    if (err){
                        return res.status(500).json({ error: 'Server Error' });
                    }
                    const {totalGws} = settRes[0]
                    const matches = generateLPmatches(result ,totalGws);
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
            })
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
        case 'R16' : 
            Team.getTeamsAll((err , allTeams)=>{
                if (err) {
                    return res.status(500).json({ error: 'Server Error (teams)' });    
                }
                Team.getQualfiedTeamsFrom('PO' ,(err, result)=>{
                    if (err) {
                        return res.status(500).json({ error: 'Server Error (teams)' });    
                    }
                   
                    let pot1 = result
                    let pot2 = allTeams.slice(0,8)



                    const matches = generateR16matches(pot1 , pot2);

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
                                return res.status(500).json({ error: 'Server Error (insert)' });
                            }
                            res.json(matches);
                        });
                    });
                })
                
            })
            break;
        case  'QF' :
            Team.getQualfiedTeamsFrom('R16' , (err , result)=>{
                if (err) {
                    return res.status(500).json({ error: 'Server Error (teams)' });    
                }
                const matches = generateQFmatches(result);


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
                            return res.status(500).json({ error: 'Server Error (insert)' });
                        }
                        res.json(matches);
                    });
                });
            })
            break
            case  'SF' :
                Team.getQualfiedTeamsFrom('QF' , (err , result)=>{
                    if (err) {
                        return res.status(500).json({ error: 'Server Error (teams)' });    
                    }
                    const matches = generateQFmatches(result);
    
    
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
                                return res.status(500).json({ error: 'Server Error (insert)' });
                            }
                            res.json(matches);
                        });
                    });
                })
                break
        default:
            res.status(400).json({ error: 'Unknown Round' });
    }
};
