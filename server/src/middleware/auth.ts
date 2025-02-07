import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Define the request type to include user data
export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
     res.status(401).json({ message: "Authorization token missing" });
     return
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Add user data to request object
    req.user = { id: decoded.id, role: decoded.role };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;
