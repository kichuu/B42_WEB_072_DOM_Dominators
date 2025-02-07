import { Router } from "express";
import auth, { AuthRequest } from "../middleware/auth";
import { createProperty, getProperties, addTenant } from "../controllers/propertyController";
import { updateRent } from "../controllers/rentController";

const router = Router();

router.post("/", auth, createProperty); // Create new property (landlord only)
router.get("/", auth, getProperties); // Get properties for the logged-in user
router.put("/:propertyId/tenant", auth, addTenant); // Add a tenant to a property
router.put("/:propertyId/rent", auth, updateRent);

export default router;
