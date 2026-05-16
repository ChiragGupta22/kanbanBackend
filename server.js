import { config } from "dotenv";
import { connectDB } from "./src/db/db.js";
import app from "./src/app.js";

config();

app.listen(5000, async () => {
  await connectDB();
  console.log("Server running on port 5000");
});
