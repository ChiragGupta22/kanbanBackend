import prisma from "../db/db.js";

const createProject = async (req, res) => {
  try {
    const { name, description, teamId } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        teamId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Project created",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getProjectsByTeam = async (req, res) => {
  try {
    const { teamId } = req.query;

    const projects = await prisma.project.findMany({
      where: { teamId },
      include: {
        issues: true,
      },
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        issues: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updated = await prisma.project.update({
      where: { id },
      data: { name, description },
    });

    res.json({
      success: true,
      message: "Project updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Project deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMyTeamProjects = async (req, res) => {
  try {
    const user = req.user;
    const { teamId } = req.query;

    if (!teamId) {
      return res.status(400).json({
        message: "teamId is required",
      });
    }

    // ADMIN → all access
    if (user.role === "ADMIN") {
      const projects = await prisma.project.findMany({
        where: { teamId },
      });

      return res.json({
        success: true,
        data: projects,
      });
    }

    // USER / MANAGER → only if member of team
    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        members: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (!team) {
      return res.status(403).json({
        message: "Access denied to this team",
      });
    }

    const projects = await prisma.project.findMany({
      where: { teamId },
    });

    return res.json({
      success: true,
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getProjectMembers = async (req, res) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      team: {
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const members = project.team.members.map((m) => m.user);

  res.json({
    success: true,
    data: members,
  });
};
export {
  createProject,
  getProjectsByTeam,
  getProjectById,
  updateProject,
  deleteProjectById,
  getMyTeamProjects,
  getProjectMembers,
};
