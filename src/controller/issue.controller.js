import prisma from "../db/db.js";

const createIssue = async (req, res) => {
  try {
    const { title, description, status, priority, projectId, assigneeId } =
      req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    const create = await prisma.issue.create({
      data: {
        title,
        description,
        priority,
        status,
        projectId,
        assigneeId: assigneeId || null,
      },
    });
    res.status(201).json({
      message: "Issue is created",
      data: create,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getIssue = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const { projectId } = req.query;

    const where = {
      projectId: projectId || undefined,
    };

    // USER sees ALL project tasks but limited drag rights
    if (role === "USER") {
      where.projectId = projectId;
    }

    const issues = await prisma.issue.findMany({
      where,
      include: {
        assignee: true,
        project: true,
      },
    });

    res.json({
      success: true,
      data: issues,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyIssues = async (req, res) => {
  try {
    const userId = req.user.id;

    const issues = await prisma.issue.findMany({
      where: {
        assigneeId: userId,
      },
      include: {
        project: true,
        assignee: true,
      },
    });

    res.json({
      success: true,
      data: issues,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await prisma.issue.findUnique({
      where: { id },
    });
    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }
    res.json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, description, priority, assigneeId } = req.body;

    const data = {
      title,
      status,
      description,
      priority,
    };

    if (assigneeId !== undefined) {
      data.assigneeId = assigneeId;
    }

    const updated = await prisma.issue.update({
      where: { id },
      data,
      include: {
        assignee: true,
      },
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.issue.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Issue deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  createIssue,
  getMyIssues,
  getIssue,
  getIssueById,
  deleteById,
  updateById,
};
