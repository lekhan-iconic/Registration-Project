import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Add contact route
router.post("/adduser", async (req, res) => {
  try {
    const { fname, lname, email, phone, dob } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO register (fname, lname, email, phone, dob) VALUES (?, ?, ?, ?, ?)",
      [fname, lname, email, phone.toString(), dob] // Convert phone to string
    );

    return res.json({
      status: true,
      message: "Record registered",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get contacts route
router.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM register");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user by ID route
router.get("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID",
      });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM register WHERE user_id = ?",
      [id]
    );

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user route
router.put("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { fname, lname, email, phone, dob } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID",
      });
    }

    const [result] = await pool.execute(
      `UPDATE register 
       SET fname = ?, lname = ?, email = ?, phone = ?, dob = ?
       WHERE user_id = ?`,
      [fname, lname, email, phone, dob, id]
    );

    if (result.affectedRows > 0) {
      res.json({
        status: true,
        message: "User updated successfully",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete contact route
router.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Convert id to integer

    // Validate id
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID",
      });
    }

    const [result] = await pool.execute(
      "DELETE FROM register WHERE user_id = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res.json({
        status: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
});

export { router as UserRouter };
