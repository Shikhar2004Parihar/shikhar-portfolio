const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST - Save contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, contactNumber, details } = req.body;
    const contact = {
      name: typeof name === "string" ? name.trim() : "",
      email: typeof email === "string" ? email.trim() : "",
      contactNumber: typeof contactNumber === "string" ? contactNumber.trim() : "",
      detail: typeof details === "string" ? details.trim() : "",
    };

    if (Object.values(contact).some((value) => !value)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    await Contact.create(contact);

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
    });
  } catch (error) {
    console.error("Contact submission failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;