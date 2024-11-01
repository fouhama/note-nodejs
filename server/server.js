import express from "express";
import dotenv from "dotenv";
import moragn from "morgan";
import notes from "./routes/notes.js";
import users from "./routes/user.js";
import { connectdb } from "./config/db.js";
import cors from "cors";
dotenv.config({
  path: "./config/config.env",
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/notes", notes);
app.use("/api/v1/user", users);
app.use(moragn("dev"));
app.get("/", (req, res) => {
  res.send("Hello Word");
});
app.listen(3000, () => {
  try {
    connectdb();
    console.log("Mongodb connected");
    console.log("Server is running on port http://localhost:3000");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
