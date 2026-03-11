const express = require("express");
const cors = require("cors");

require("./config/db");

const app = express();




// Middleware
//app.use(cors());

//Temp fix for CORS issues during development - allow all origins (not recommended for production)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const grievanceRoutes = require("./routes/grievanceRoutes");
app.use("/api/grievances", grievanceRoutes);

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

//const express = require("express");
//const cors = require("cors");

const { authMiddleware, adminMiddleware } = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});