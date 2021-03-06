const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("./../models/user.model");

router.post("/register", async (req, res) => {
  const user1 = await User.findOne({ email: req.body.email });
  if (user1) return res.status(400).send("user exists");

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: newPassword,
    });
    res.status(200).json(user);
  } catch (err) {
    res.json({ status: "error", error: "cannot created" });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({ status: "error", user: false });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: true, token: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.get("/userinfo/:email", async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404);
  } else {
    res.send(user);
  }
});

module.exports = router;
