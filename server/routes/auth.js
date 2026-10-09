import express from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";
import process from "node:process";

const router = express.Router();

const findUserByEmail = db.prepare(
  "SELECT id FROM users WHERE email = ?"
);

const getUserByEmail = db.prepare(`
  SELECT id, name, email, password_hash
  FROM users
  WHERE email = ?
  `);

const createUser = db.prepare(`
  INSERT INTO users(name, email, password_hash)
VALUES(?, ?, ?)
  `);

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Name, email, and password are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2 || cleanName.length > 80) {
      return res.status(400).json({
        message: "Name must be between 2 and 80 characters.",
      });
    }

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    if (password.length < 8 || password.length > 72) {
      return res.status(400).json({
        message: "Password must be between 8 and 72 characters.",
      });
    }

    if (findUserByEmail.get(cleanEmail)) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = createUser.run(
      cleanName,
      cleanEmail,
      passwordHash
    );

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: result.lastInsertRowid,
        name: cleanName,
        email: cleanEmail,
      },
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Unable to create your account.",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = getUserByEmail.get(cleanEmail);

    if (
      !user ||
      !(await bcrypt.compare(password, user.password_hash))
    ) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    return res.json({
      message: "Login successful.",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Unable to log in.",
    });
  }
});

// Check current session
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Not logged in.",
    });
  }

  return res.json({ user: req.session.user });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: "Unable to log out.",
      });
    }

    res.clearCookie("chatbot.sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({
      message: "Logout successful.",
    });
  });
});

export default router;
