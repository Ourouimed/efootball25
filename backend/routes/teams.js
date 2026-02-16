import express from 'express';
import { DeleteTeam, getAllteams, registerTeam, setSanction, UpdateTeam } from '../controllers/teamController.js';

const router = express.Router();

router.get('/', getAllteams);
router.post('/sanction/:userName', setSanction);
router.post('/register', registerTeam);
router.delete('/delete/:userName', DeleteTeam);
router.post('/update/:userName', UpdateTeam);

export default router;
