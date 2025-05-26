const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/verify-session', authController.verifySession);
router.delete('/logout', authController.logout);

module.exports = router;
