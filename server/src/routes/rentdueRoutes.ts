import { Router } from "express";
import { getRentDues, markRentAsPaid } from "../controllers/rentController";
import auth from "../middleware/auth";

const router = Router();

// Get rent dues for the logged-in user
router.get("/", auth, getRentDues);
// Mark rent payment as paid (tenant)
router.put("/:rentDueId/paid", auth, markRentAsPaid);

export default router;
