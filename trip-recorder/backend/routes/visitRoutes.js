import express from "express";
import { getVisits, addVisits, deleteVisits, updateVisits } from "../controllers/visitControllers.js"
import authMiddleware from "../middleware/authMiddleware.js";
import tripAuth from "../middleware/tripMiddleware.js";

const router = express.Router({
    mergeParams: true
});

router.use(authMiddleware);
router.use(tripAuth);

router.get('/', getVisits);

router.post('/', addVisits);

router.delete('/:id', deleteVisits);

router.put('/:id', updateVisits);

export default router;