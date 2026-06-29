import express from "express";
import { userSignup, userLogin } from "../controllers/authControllers.js";

const router = express.Router();

router.post('/register',userSignup );

router.post('/login',userLogin );

export default router;