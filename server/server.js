import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const PORT = 3000;

console.log("URI:", process.env.MONGODB_URI); 
await connectDB();

app.use(cors());
app.use(clerkMiddleware())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use('/api/inngest', serve({ client: inngest, functions }))

app.use("/api/show", showRouter);

app.use('/api/booking', bookingRouter);

app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});