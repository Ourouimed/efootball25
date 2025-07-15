const Match = require('../models/Match');
const Settings = require('../models/Settings');
const Team = require('../models/Team');
const { generateLPmatches  , generateR16matches, generateKoMatches} = require('../utils/matchGenerator');

exports.generateDraw = (req, res) => {
    const { round } = req.body;
    console.log(round)
    switch (round) {
        case 'LP':
            Team.getTeamsAll((err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Server Error ' , message :  'Failed to fetch teams'});
                    
                }

                Settings.getAllSettings((err , settRes)=>{
                    if (err){
                        return res.status(500).json({ error: 'Server Error' , message : 'Failed to get settings'});
                    }
                    const {totalGws} = settRes[0]
                    console.log(settRes)
                    const matches = generateLPmatches(result ,totalGws);
                    Match.deleteMatchesByRound(round , (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Server Error ' , message : 'Failed to delete matches' });
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
                                return res.status(500).json({ error: 'Server Error' , message : 'Failed to save matches'});
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
                    return res.status(500).json({ error: 'Server Error ' , message :  'Failed to fetch teams'});
                }

                let poTeams = result.map(team => ({...team , pts : (Number(team.wins) * 3) + (Number(team.draws) * 1) + (Number(team.losses) * 0) - team.sanction})).sort((a, b) => b.pts - a.pts || (b.GF - b.GA) - (a.GF - a.GA)).slice(8,24)
                const matches = generateKoMatches(poTeams , 'PO');
                

                
                Match.deleteMatchesByRound(round , (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Server Error ' , message : 'Failed to delete matches' });
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
                            return res.status(500).json({ error: 'Server Error' , message : 'Failed to save matches'});
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
                    let pot2 = allTeams.map(team => ({...team , pts : (Number(team.wins) * 3) + (Number(team.draws) * 1) + (Number(team.losses) * 0) - team.sanction})).sort((a, b) => b.pts - a.pts || (b.GF - b.GA) - (a.GF - a.GA)).slice(0,8)

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
                const matches = generateKoMatches(result , 'QF');


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
                    const matches = generateKoMatches(result , 'SF');
    
    
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
