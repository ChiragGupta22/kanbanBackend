import prisma from "../db/db.js";
const createTeam = async (req, res) => {
  try {
    const { name } = req.body;

    const team = await prisma.team.create({
      data: {
        name,
        ownerId: req.user.id,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Team created successfully",
      team,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    return res.status(200).json({
      success: true,
      team,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getAllTeam = async (req, res) => {
  try {
    const user = req.user;

    const teams = await prisma.team.findMany({
      where: {
        OR: [
          { ownerId: user.id }, // owner
          {
            members: {
              some: {
                userId: user.id, // member
              },
            },
          },
        ],
      },
    });

    return res.json({
      success: true,
      team: teams,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const existing = await prisma.team.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        message: "Team not found",
      });
    }
    if (existing.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }
    const updated = await prisma.team.update({
      where: { id },
      data: { name },
    });

    return res.status(200).json({
      success: true,
      message: "Team updated successfully",
      team: updated,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const deleteTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.team.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        message: "Team not found",
      });
    }
    if (req.user.role !== "ADMIN" && existing.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    const deleted = await prisma.team.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAll = async (req, res) => {
  try {
    const deleted = await prisma.team.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "ALL Team deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export {
  createTeam,
  getTeamById,
  getAllTeam,
  deleteTeamById,
  deleteAll,
  updateTeamById,
};
