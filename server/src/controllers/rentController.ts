import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";
import Property from "../models/Property";

// Get all rent dues for the logged-in tenant
export const getRentDues = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.rentDues);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Mark a rent due as paid
export const markRentAsPaid = async (req: AuthRequest, res: Response) : Promise<any>=> {
  try {
    const { rentDueId } = req.params;

    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const rentDue = user.rentDues.find(due => due?._id.toString() === rentDueId);
        if (!rentDue) return res.status(404).json({ message: "Rent due not found" });

    rentDue.paid = true;
    await user.save();

    res.json({ message: "Rent marked as paid", rentDue });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateRent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { propertyId } = req.params;
    const { rentAmount } = req.body;

    if (!rentAmount || rentAmount <= 0) {
      return res.status(400).json({ message: "Invalid rent amount" });
    }

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    property.rentAmount = rentAmount;
    await property.save();

    res.json({
      message: "Rent updated successfully",
      property: {
        _id: property._id,
        name: property.name,
        rentAmount: property.rentAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};