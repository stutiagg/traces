import express from "express";
import { getTrips, addTrips, deleteTrips, updateTrips } from "../controllers/tripControllers.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', authMiddleware, getTrips);

router.post('/', authMiddleware, addTrips);

router.delete('/:id', authMiddleware, deleteTrips);

router.put('/:id', authMiddleware, updateTrips);

export default router;