import User from "../models/user.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    try {
        // Extract user details from request body
        const { email, name, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User.create({ email, name, password: hashedPassword });

        //TODO : Send verification email

        res.status(200).json({ message: "Verification email sent to your email. Please check and verify your account" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export { registerUser, loginUser };