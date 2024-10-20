import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: string };
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) return res.status(401).json({ message: "Authentication failed" });

  const jwtSecret = process.env.JWT_SECRET || "";
  
  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string;
      role: string;
    };
    req.user = decoded; // Set the user property on the request
    next(); // Call next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      error: (error as Error).message,
    });
  }
};
