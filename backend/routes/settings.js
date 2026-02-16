import express from 'express';
import { getSettings, setSettings } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.post('/set', setSettings);

export default router;
