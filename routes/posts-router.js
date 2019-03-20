const express = require("express");

const db = require("../data/helpers/postDb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong retrieving posts." });
  }
});

router.post("/", async (req, res) => {
  if (req.body.text && req.body.user_id) {
    try {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong adding the post." });
    }
  } else {
    res.status(400).json({ message: "Please provide text and the user id." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.getById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post could not be located." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong fetching the post." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (text) {
    try {
      const count = await db.update(id, req.body);
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "The post could not be located." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong trying to update the post." });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please provide updated text for the post." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db.remove(id);
    if (count) {
      res.status(200).json(count);
    } else {
      res.status(404).json({ message: "The user could not be located." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while trying to delete the user."
    });
  }
});

module.exports = router;
