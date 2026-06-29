import express from "express";
import { getTrips, addTrips, deleteTrips, updateTrips } from "../controllers/tripControllers.js"

const router = express.Router();

router.get('/', getTrips);

router.post('/', addTrips);

router.delete('/:id', deleteTrips);

router.put('/:id', updateTrips);

export default router;