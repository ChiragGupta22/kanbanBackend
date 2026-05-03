import express from "express";
import {
  createIssue,
  deleteById,
  getIssue,
  getIssueById,
  updateById,
  getMyIssues,
} from "../controller/issue.controller.js";
import { auth, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, authorize("ADMIN", "MANAGER", "USER"), createIssue);

// ALL issues (admin/manager)
router.get("/", auth, authorize("ADMIN", "MANAGER", "USER"), getIssue);

// USER only "my tasks"
router.get("/my", auth, authorize("ADMIN", "MANAGER", "USER"), getMyIssues);

router.get("/:id", auth, authorize("ADMIN", "MANAGER", "USER"), getIssueById);

router.put("/:id", auth, authorize("ADMIN", "MANAGER", "USER"), updateById);

router.delete("/:id", auth, authorize("ADMIN", "MANAGER", "USER"), deleteById);

export default router;
