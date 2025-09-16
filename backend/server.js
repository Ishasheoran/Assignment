import mongoose from "mongoose";
import express from "express"
import cors from "cors"

import dotenv from "dotenv";
dotenv.config();


import profileRoutes from "./Routes/profileRoutes.js"

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://your-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// health check
app.get("/health", (req, res) => res.status(200).send("OK"));

// routes
app.use("/api/profile", profileRoutes);


// connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
