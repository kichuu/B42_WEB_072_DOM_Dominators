import { Request, Response } from "express";
import MaintenanceRequest from "../models/MaintenanceRequest";
import Property from "../models/Property";
import { AuthRequest } from "../middleware/auth";

// Create a new maintenance request
export const createMaintenanceRequest = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { propertyId, issueType, description, urgency } = req.body;
    
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const request = await MaintenanceRequest.create({
      tenant: req.user?.id,
      property: propertyId,
      issueType,
      description,
      urgency,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get maintenance requests for the logged-in user
export const getMaintenanceRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await MaintenanceRequest.find({
      $or: [{ tenant: req.user?.id }, { property: req.user?.id }],
    }).populate("tenant property");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update the status of a maintenance request (landlord only)
export const updateMaintenanceStatus = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const request = await MaintenanceRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (req.user?.role !== "landlord") {
      return res.status(403).json({ message: "Only landlords can update the status" });
    }

    request.status = status;
    await request.save();

    res.json({ message: "Request status updated", request });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
