import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const userSignup = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(
        password,
        10
        );

    const {data, error} = await supabase
    .from("users")
    .insert(
        [{
            email: email,
            password: hashedPassword
        }]
    )
    .select()
    .single();

    if (error) return res.status(400).json(error);

    res.status(201).json(data);

};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

    if (error || !data) {
  return res.status(401).json({
    message: "Invalid credentials"
  });
}

    const isMatch = await bcrypt.compare(password, data.password);

    if (!isMatch) return res.status(401).json({
        message: "Invalid credentials"
    });

    
    const token = jwt.sign(
        {userId : data.id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    res.status(200).json({ token });

}
