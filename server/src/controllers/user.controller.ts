import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateJWT } from "../utils/generateToken";

// User registration
// POST
// Public
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;
console.log(req.body);

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Generate JWT token
    const token = generateJWT(user);

    res.status(201).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// User login
// POST
// Public
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
    console.log(req);
    
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = generateJWT(user);

    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
