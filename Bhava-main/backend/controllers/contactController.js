import Contact from "../models/Contact.js";

// POST /api/contact  — submit a contact message (public)
export const submitContact = async (req, res) => {
  try {
    const { name, mobile, email, description } = req.body;

    if (!name || !mobile || !description) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile, and description are required.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    if (description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters.",
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      mobile: mobile.trim(),
      email: email ? email.trim() : "",
      description: description.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out. We will get back to you soon.",
      id: contact._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// GET /api/contact  — list all messages (protected, admin use)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
