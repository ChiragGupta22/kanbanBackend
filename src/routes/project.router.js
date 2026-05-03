import express from "express";
import {
  createProject,
  getProjectsByTeam,
  getProjectById,
  updateProject,
  deleteProjectById,
  getMyTeamProjects,
  getProjectMembers,
} from "../controller/project.controller.js";
import { auth, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/", auth, authorize("ADMIN", "MANAGER"), createProject);
router.get("/:id", auth, authorize("ADMIN", "MANAGER", "USER"), getProjectById);
router.get("/", auth, authorize("ADMIN", "MANAGER", "USER"), getProjectsByTeam);
router.put("/:id", auth, authorize("ADMIN", "MANAGER", "USER"), updateProject);
router.delete(
  "/:id",
  auth,
  authorize("ADMIN", "MANAGER", "USER"),
  deleteProjectById,
);
router.get("/team-projects", auth, getMyTeamProjects);

router.get("/:projectId/members", auth, getProjectMembers);

export default router;
