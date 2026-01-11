const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());

// ✅ CORS — allow all (safe for now)
app.use(cors());

// routes
const transactionRoutes = require("./routes/transactionroutes");
app.use("/api/transactions", transactionRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

module.exports = app;
