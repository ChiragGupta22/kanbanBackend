import express from "express";
import {
  addMember,
  getMember,
  removeMember,
} from "../controller/teamMember.controller.js";
import { auth, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", auth, authorize("ADMIN", "MANAGER"), addMember);
router.get("/", auth, authorize("ADMIN", "MANAGER"), getMember);
router.delete("/", auth, authorize("ADMIN", "MANAGER"), removeMember);

export default router;
