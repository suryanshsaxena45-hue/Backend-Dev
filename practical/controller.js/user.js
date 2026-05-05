import { StatusCodes } from "http-status-pro-js";
import user from "../schema/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new user({
            name,
            email,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(StatusCodes.CREATED).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error registering user" });
    }
};

// login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid credentials" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(StatusCodes.OK).json({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error logging in user" });
    }
};

