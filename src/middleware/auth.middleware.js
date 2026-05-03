import jwt from "jsonwebtoken";
import prisma from "../db/db.js";
export const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "No token, not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(token);

    // console.log(decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated",
        success: false,
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
        success: false,
      });
    }
    next();
  };
};
