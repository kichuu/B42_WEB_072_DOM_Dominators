import { Request, Response } from "express";
import Property from "../models/Property";
import User from "../models/User";


export interface AuthRequest extends Request {
    user?: { id: string; role: string };
  }
export const createProperty = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      if (req.user?.role !== "landlord") {
        return res.status(403).json({ message: "Only landlords can add properties" });
      }
      const { name } = req.body;
      const { address } = req.body;
      const property = await Property.create({name:name, landlord: req.user.id, address, tenants: [] });
  
      return res.status(201).json(property);  // return Response here
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });  // return Response here
    }
  };
  
  export const getProperties = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      let properties;
      if (req.user?.role === "landlord") {
        properties = await Property.find({ landlord: req.user.id }).populate("tenants", "name email");
      } else {
        properties = await Property.find({ tenants: req.user?.id }).populate("landlord", "name email");
      }
  
      return res.json(properties);  // return Response here
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });  // return Response here
    }
  };
  
  export const addTenant = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const { propertyId } = req.params;
      const { tenantEmail } = req.body;
  
      if (req.user?.role !== "landlord") {
        return res.status(403).json({ message: "Only landlords can add tenants" });
      }
  
      const property = await Property.findById(propertyId);
      if (!property) return res.status(404).json({ message: "Property not found" });
  
      if (property.landlord.toString() !== req.user.id) {
        return res.status(403).json({ message: "You don't own this property" });
      }
  
      const tenant = await User.findOne({ email: tenantEmail, role: "tenant" });
      if (!tenant) return res.status(404).json({ message: "Tenant not found" });
  
      if (property.tenants.includes(tenant._id as any)) {
        return res.status(400).json({ message: "Tenant already assigned to this property" });
      }
  
      property.tenants.push(tenant._id as any);
      await property.save();
  
      return res.json({ message: "Tenant added successfully", property });  // return Response here
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });  // return Response here
    }
  };
  

