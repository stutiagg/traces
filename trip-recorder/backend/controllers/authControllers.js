import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

