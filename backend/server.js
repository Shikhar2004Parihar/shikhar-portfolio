const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("node:path");

dotenv.config({ path: path.join(__dirname, ".env") });

const chatRoutes = require('./routes/chatRoutes');
const contactRoutes = require("./routes/contactRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_ORIGIN || "https://shikhar-portfolio-3wsw.vercel.app", "http://localhost:5173", "http://127.0.0.1:5173"],
}));
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use('/api/chat', chatRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Portfolio backend is running");
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add it to backend/.env.");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Backend startup failed:", error.message);
  process.exitCode = 1;
});