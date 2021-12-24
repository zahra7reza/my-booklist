const express = require("express");
const { render } = require("express/lib/response");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

// All author route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "1");
  }
  // RegExp stands for Regular Expression
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
  res.render("authors/index");
});

// New author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create author route
render.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);
  } catch {
    res.render("author/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(5).exec();
    res.render("authors/show", {
      author: author,
      booksByAuthor: books,
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch {
    res.redirect("/authors");
  }
});

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("author/new", {
        author: author,
        errorMessage: "Error creating Author",
      });
    }
  }
});
res.render("authors/new", { author: new Author() });

render.put("/:id", (req, res) => {
  res.send("Update Author " + req.params.id);
});

render.get("/:id", (req, res) => {
  res.send("Delete Author " + req.params.id);
});

router.deleted("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect(`/authors`);
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;
