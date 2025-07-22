const Settings = require('../models/Settings')


exports.getSettings = (req  , res)=>{
    Settings.getAllSettings((err, settings) => {
        if (err) {
            return res.status(500).json({ error: 'Server Error' });    
        }
        res.json(settings[0])
    })
}

exports.setSettings = (req , res)=>{
    const {currentRound , totalGws , deadlineDate , registerIsOpen} = req.body
    console.log(req.body)
    Settings.setAllSettings([deadlineDate , currentRound  , registerIsOpen , totalGws] ,(err , results)=>{
        if (err){
            console.log(err)
            return res.status(500).json({ message: 'Server Error' });  
        }
        
        res.json({message : 'Settings Updated Succefully'})
    })


}