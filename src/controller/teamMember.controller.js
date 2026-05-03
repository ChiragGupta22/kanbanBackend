import prisma from "../db/db.js";

const addMember = async (req, res) => {
  try {
    const { userId, teamId, role } = req.body;

    const currentUser = req.user;

    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const isAdmin = currentUser.role === "ADMIN";

    if (!isAdmin && team.ownerId !== currentUser.id) {
      return res.status(403).json({
        message: "Only owner or admin can add members",
      });
    }

    const existing = await prisma.teamMember.findFirst({
      where: { userId, teamId },
    });

    if (existing) {
      return res.status(400).json({
        message: "User already in team",
      });
    }

    const member = await prisma.teamMember.create({
      data: {
        userId,
        teamId,
        role,
      },
    });

    res.json({
      success: true,
      message: "Member added",
      data: member,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMember = async (req, res) => {
  try {
    const { teamId } = req.params;

    const members = await prisma.teamMember.findMany({
      where: { teamId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        team: true,
      },
    });

    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const removeMember = async (req, res) => {
  try {
    const { userId, teamId } = req.body;

    await prisma.teamMember.delete({
      where: {
        userId_teamId: {
          userId,
          teamId,
        },
      },
    });

    res.json({
      success: true,
      message: "Member removed",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { addMember, getMember, removeMember };
