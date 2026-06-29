import express from "express";
import { getVisits, addVisits, deleteVisits, updateVisits } from "../controllers/tripControllers.js"

const router = express.Router();

router.get('/', getVisits);

router.post('/', addVisits);

router.delete('/:id', deleteVisits);

router.put('/:id', updateVisits);

export default router;