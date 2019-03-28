const express = require("express");

const db = require("../data/helpers/userDb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong retrieving users." });
  }
});

router.post("/", async (req, res) => {
  if (req.body.name) {
    try {
      const user = await db.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong adding the user." });
    }
  } else {
    res.status(400).json({ message: "Please provide a name for the user." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user could not be located." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong fetching the user." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (name) {
    try {
      const count = await db.update(id, req.body);
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "The user could not be located." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong trying to update the user." });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please provide an updated name for the user." });
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

router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await db.getUserPosts(id);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "The user posts could not be located." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong fetching the user posts." });
  }
});

module.exports = router;
