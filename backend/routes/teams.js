const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/', teamController.getAllteams);
router.get('/register', teamController.registerTeam);

module.exports = router;
