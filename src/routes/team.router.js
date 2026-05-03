import express from "express";
import {
  getAllTeam,
  createTeam,
  getTeamById,
  deleteTeamById,
  deleteAll,
  updateTeamById,
} from "../controller/team.controller.js";

import { auth, authorize } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", auth, authorize("ADMIN", "MANAGER"), createTeam);
router.get("/:id", auth, authorize("ADMIN", "MANAGER", "USER"), getTeamById);
router.delete("/:id", auth, authorize("ADMIN", "MANAGER"), deleteTeamById);
router.get("/", auth, authorize("ADMIN", "MANAGER", "USER"), getAllTeam);
router.delete("/", auth, authorize("ADMIN"), deleteAll);
router.put("/:id", auth, authorize("ADMIN", "MANAGER"), updateTeamById);

export default router;
