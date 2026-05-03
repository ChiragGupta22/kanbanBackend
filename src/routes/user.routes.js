import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  getAllUsers,
} from "../controller/user.controller.js";
import { auth, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", auth, logoutUser);
router.get("/me", auth, getMe);
router.get("/", auth, authorize("ADMIN", "MANAGER"), getAllUsers);

export default router;
