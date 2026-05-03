import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import teamRoutes from "./routes/team.router.js";
import teamMember from "./routes/teamMember.routes.js";
import projectRoutes from "./routes/project.router.js";
import issueRoutes from "./routes/issue.router.js";
import avatarRoutes from "./routes/avatar.router.js";
// import multer from "multer";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://kanban-frontend-s.vercel.app",
    credentials: true,
  }),
);
// routes
app.use("/api/user", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/member", teamMember);
app.use("/api/project", projectRoutes);
app.use("/api/issue", issueRoutes);
app.use("/api/avatar", avatarRoutes);

export default app;
