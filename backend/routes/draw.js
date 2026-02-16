import express from 'express';
import { generateDraw } from '../controllers/drawController.js';

const router = express.Router();

router.post('/', generateDraw);

export default router;
