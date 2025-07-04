const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/', matchController.getAllMatches);
router.post('/update/:id', matchController.updateMatch);
module.exports = router;
