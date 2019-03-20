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

router.post("/", async (req, res) => {});

router.get("/:id", async (req, res) => {});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

module.exports = router;
