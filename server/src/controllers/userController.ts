import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";

export const getUserProfile = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTenants = async (req: AuthRequest, res: Response): Promise<any>  => {
  try {
    if (req.user?.role !== "landlord") {
      return res.status(403).json({ message: "Only landlords can view tenants" });
    }

    const tenants = await User.find({ role: "tenant" }).select("name email");
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
