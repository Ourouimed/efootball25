const express = require('express');
const router = express.Router();
const drawController = require('../controllers/drawController');

router.post('/', drawController.generateDraw);

module.exports = router;
