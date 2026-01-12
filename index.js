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

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

dbConnect().then(() => console.log("MongoDB connected"));



module.exports = app;
