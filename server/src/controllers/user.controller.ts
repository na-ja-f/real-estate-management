import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateJWT } from "../utils/generateToken";

// User registration
// POST
// Public
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

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
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = generateJWT(user);

    res.status(201).json({
      message: "Agent created",
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
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

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.isBlocked) {
      res.status(404).json({ message: "User is blocked" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = generateJWT(user);

    res.status(200).json({
      message: "Login Succesfull",
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

// get all User
// GET
// Private
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

// get all User
// PATCH
// Private
export const blockUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    user.isBlocked = !user?.isBlocked;
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " failed" });
  }
};

// get all User
// PATCH
// Private
export const changeRole = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    user.role == 'Agent' ? user.role = 'Manager' : user.role = 'Agent';
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "role change failed" });
  }
};
