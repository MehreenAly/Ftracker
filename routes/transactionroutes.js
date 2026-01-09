const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: add new transaction
router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE transaction
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
