const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//models
const User = require("../models/users.model");

//utils
const {
  signup,
  getAllUsers,
  login,
  changeUserDetails,
  getUserById,
  deleteUserById,
} = require("../utils/users.functions");

router.get("", async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users) {
      res.status(200).json({ message: "Users found", data: users });
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Interanl Server Error", error });
  }
});

router.post("/signup", async (req, res) => {
  const userDetails = req.body;
  const isUserExist = await User.findOne({ email: userDetails.email });

  if (isUserExist) {
    const msg = "Email already taken";
    console.error(new Error(msg));
    return res.status(403).json({ error: msg });
  } else {
    try {
      const newUser = await signup(userDetails);
      if (newUser) {
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
          expiresIn: "24h",
        });
        res
          .status(201)
          .json({
            message: "Signup successful",
            data: { token, username: newUser.username },
          });
      } else {
        res.status(400).json({ message: "Signup failed" });
      }
    } catch (error) {
      res.status(500).json({ message: "Interanl Server Error", error });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const msg = "Username Invalid";
    console.error(msg);
    res.status(404).json({ message: msg });
  } else {
    try {
      const loggedInUser = await login(user, password);
      if (loggedInUser) {
        const token = jwt.sign({ userId: loggedInUser._id }, JWT_SECRET, {
          expiresIn: "24h",
        });
        res
          .status(200)
          .json({
            message: "Logged In",
            data: { token, username: loggedInUser.username },
          });
      } else {
        res.status(401).json({ message: "Incorrect Credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Interanl Server Error", error });
    }
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    if (user) {
      res.status(200).json({ message: "User found", data: user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Interanl Server Error", error });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await deleteUserById(userId);
    if (user) {
      res.status(200).json({ message: "User Deleted", data: user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Interanl Server Error", error });
  }
});

router.post("/:id/update", async (req, res) => {
  const userId = req.params.id;
  const newUserDetails = req.body;
  try {
    const updatedUser = await changeUserDetails(userId, newUserDetails);
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User details updated", data: updatedUser });
    } else {
      res.status(400).json({ message: "User details updation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Interanl Server Error", error });
  }
});

module.exports = router;
