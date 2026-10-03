const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/complaints", complaintRoutes);

const courseRoutes = require("./routes/courseRoutes");

app.use("/api/courses", courseRoutes);

const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);

const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);
// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully ✅");
    })
    .catch((error) => {
        console.log("MongoDB connection failed ❌");
        console.log(error.message);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "NEXORA AI Backend is running 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});