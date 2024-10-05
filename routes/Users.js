const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs"); // hash passwords
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken"); // create token
const { validateRegistration } = require("../middlewares/validationMiddleware");

router.post("/", validateRegistration, async (req, res) => {
  // adding user to database
  const { Username, Password } = req.body;

  // Check if username already exists
  const existingUser = await Users.findOne({ where: { Username: Username } });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // hash password
  bcrypt.hash(Password, 10).then((hash) => {
    Users.create({
      Username: Username,
      Password: hash,
    });
    res.json("success");
  });
});

router.post("/login", async (req, res) => {
  // checking if user exists in database
  const { Username, Password } = req.body;

  const user = await Users.findOne({ where: { Username: Username } });

  if (!user) res.json({ error: "User does not exist" });

  bcrypt.compare(Password, user.Password).then((match) => {
    if (!match) res.json({ error: "Wrong Username and Password Combination" });

    const accessToken = sign(
      { Username: user.Username, id: user.id },
      "importantsecret"
    );
    res.json({token: accessToken, Username:Username, id: user.id}); // send token to frontend
  });

  router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
  });
});

module.exports = router;