import prisma from "../db/db.js";
import uploadFile from "../services/storage.services.js";

const createPost = async (req, res) => {
  try {
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const result = await uploadFile(req.file.buffer);

    const userId = req.user.id;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: result.url,
      },
    });

    return res.status(200).json({
      message: "Avatar uploaded successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    return res.status(200).json({
      message: "Post fetched",
      data: post.avatar,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { createPost, getPost };
