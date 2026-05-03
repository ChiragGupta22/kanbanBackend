import express from "express";
import { createPost, getPost } from "../controller/avatar.controller.js";
import multer from "multer";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", auth, upload.single("avatar"), createPost);
router.get("/", auth, getPost);

export default router;
