require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "https://ftracker-frontend.vercel.app"
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
}));

const transactionRoutes = require("./routes/transactionroutes");
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB connection failed:", err));

module.exports = app;
