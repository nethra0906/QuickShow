import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/db.js";

const app = express();
const PORT = 3000;

await connectDB()

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});