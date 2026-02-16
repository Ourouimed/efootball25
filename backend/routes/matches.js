import express from 'express';
import { getAllMatches, updateMatch } from '../controllers/matchController.js';

const router = express.Router();

router.get('/', getAllMatches);
router.post('/update/:id', updateMatch);

export default router;
