import express from 'express';
import {getMap} from '../controllers/mapControllers.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/map', authMiddleware, getMap);

export default router;