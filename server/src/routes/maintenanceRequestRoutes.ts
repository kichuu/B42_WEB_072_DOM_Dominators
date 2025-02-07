import { Router } from "express";
import auth from "../middleware/auth";
import { createMaintenanceRequest, getMaintenanceRequests, updateMaintenanceStatus } from "../controllers/maintenanceController";

const router = Router();

// Create a new maintenance request (tenant only)
router.post("/", auth, createMaintenanceRequest);
// Get maintenance requests for the logged-in user
router.get("/", auth, getMaintenanceRequests);
// Update maintenance request status (landlord only)
router.put("/:requestId/status", auth, updateMaintenanceStatus);

export default router;
