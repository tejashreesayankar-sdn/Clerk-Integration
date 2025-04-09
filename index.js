const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Clerk Auth Middleware
app.use(ClerkExpressWithAuth({ jwtKey: process.env.CLERK_JWT_PUBLIC_KEY }));

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Clerk Fullstack API");
});

app.listen(3001, () => console.log("Server is Running on http://localhost:3001"));
