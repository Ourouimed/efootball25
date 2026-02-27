import express from 'express';
import { DeleteTeam, getAllteams, getStanding, calculatePoints ,registerTeam, setSanction, UpdateTeam } from '../controllers/teamController.js';

const router = express.Router();

router.get('/', getAllteams);
router.get('/standings' , getStanding)
router.post('/sanction/:userName', setSanction);
router.post('/register', registerTeam);
router.delete('/delete/:userName', DeleteTeam);
router.post('/update/:userName', UpdateTeam);
router.post('/calculatepoints', calculatePoints)

export default router;
