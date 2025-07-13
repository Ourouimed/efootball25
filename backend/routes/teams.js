const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/', teamController.getAllteams);
router.post('/sanction/:userName' , teamController.setSanction)
router.post('/register', teamController.registerTeam);
router.delete('/delete/:userName', teamController.DeleteTeam);
router.post('/update/:userName', teamController.UpdateTeam);

module.exports = router;
