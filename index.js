const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const transactionRoutes = require("./routes/transactionroutes");
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = true;
  console.log("MongoDB connected");
}

connectDB();

module.exports = app;
