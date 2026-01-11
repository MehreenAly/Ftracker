const cors = require("cors");


const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 👇 MUST
app.use(express.json());
app.use(cors());

// 👇 routes import
const transactionRoutes = require("./routes/transactionroutes");

// 👇 routes mount (MOST IMPORTANT)
app.use("/api/transactions", transactionRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/ftracker")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on 5000"));
  })
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;

module.exports = app;
