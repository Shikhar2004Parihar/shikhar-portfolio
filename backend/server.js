const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("node:path");
const connectToDatabase = require("./database");

dotenv.config({ path: path.join(__dirname, ".env") });
console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

const chatRoutes = require('./routes/chatRoutes');
const contactRoutes = require("./routes/contactRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use('/api/chat', chatRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Portfolio backend is running");
});

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Backend startup failed:", error.message);
    process.exitCode = 1;
  });
}

module.exports = app;