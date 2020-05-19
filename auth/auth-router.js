const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const restrict = require("./authenticate-middleware");
const Users = require("../users/users-model");
const secret = require("../database/secret")


const router = express.Router();


// POST to register a new user
router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({ message: "Username not available" });
    }

    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});



// POST to login a user
router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Password or Username is incorrect",
  };

  try {
    const user = await Users.findBy({
      username: req.body.username,
    }).first();

    if (!user) {
      return res.status(401).json("Please register before logging in", authError);
    }

    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordValid) {
      return res.status(401).json("Password not recognized", authError);
    }

    const tokenPayload = {
      userId: user.userId,

    };

    token = jwt.sign(tokenPayload, secret);

    res.cookie("token", jwt.sign(tokenPayload, secret));

    res.json({
      message: `Welcome`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;