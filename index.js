const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  let books;
  try {
    books = await Book.find().sort({ createdAt: "desc" }).limit(10).exec();
  } catch {
    books = [];
  }
  // [] this symbol means an empty erray
  res.render("index", { books: books });
});

module.exports = router;
