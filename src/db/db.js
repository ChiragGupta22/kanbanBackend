import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database is connected Successfully");
  } catch (error) {
    console.error("Data base is connected ", error);
    process.exit(1);
  }
};

export default prisma;
