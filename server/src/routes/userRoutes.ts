import { Router } from "express";
import auth from "../middleware/auth";
import { getTenants, getUserProfile } from "../controllers/userController";

const router = Router();

router.get("/profile", auth, getUserProfile); // Get user profile
router.get("/tenants", auth, getTenants); // Get all tenants (landlords only)

export default router;
