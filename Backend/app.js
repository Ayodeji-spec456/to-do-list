import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
