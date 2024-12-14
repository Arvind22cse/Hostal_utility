/*import Complaint from "../models/complaint.model.js";
import Signup from "../models/signup.model.js";
export const create_complaint = async (req, res) => {
    const data = req.body;
    console.log("Received complaint data:", data); // Log the data received

    if (!data.name || !data.email || !data.roomno || !data.comp) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newdata = new Complaint(data);
    try {
        const savedComplaint = await newdata.save();
        console.log("Complaint saved:", savedComplaint); // Log saved complaint
        res.status(201).json({ success: true, data: savedComplaint });
    } catch (err) {
        console.error("Error creating complaint:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const get_complaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const get_hostalstud = async (req, res) => {
    try {
        const signup = await Signup.find();
        res.status(200).json({ success: true, data: signup });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};*/

import Complaint from "../models/complaint.model.js";
import Signup from "../models/signup.model.js";
import nodemailer from "nodemailer";

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arvindm.22cse@kongu.edu",
    pass: "acjs lyjx izfi vume", // Use an app password instead of your actual password
  },
});

// Controller to create a complaint and send an email notification
export const create_complaint = async (req, res) => {
  const { name, email, roomno, comp } = req.body;
  console.log("Received complaint data:", req.body);

  if (!name || !email || !roomno || !comp) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newComplaint = new Complaint({ name, email, roomno, comp });

  try {
    // Save complaint to database
    const savedComplaint = await newComplaint.save();
    console.log("Complaint saved:", savedComplaint);

    // Send email notification
    const mailOptions = {
      from: "arvindm.22cse@kongu.edu",
      to: "arvindmurugesan001@gmail.com", // Replace with the actual recipient(s)
      subject: "New Complaint Submitted",
      text: `Complaint Details:\nName: ${name}\nEmail: ${email}\nRoom No: ${roomno}\nComplaint: ${comp} http://localhost:5173/viewcomplaint`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(201).json({ success: true, data: savedComplaint, message: "Complaint submitted and email sent" });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller to fetch all complaints
export const get_complaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller to fetch hostel students
export const get_hostalstud = async (req, res) => {
  try {
    const students = await Signup.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching hostel students:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Unified handler for complaints with email functionality
export const handleComplaint = async (req, res) => {
  const { name, email, roomno, comp } = req.body;

  if (!name || !email || !roomno || !comp) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Save complaint in database
    const newComplaint = new Complaint({ name, email, roomno, comp });
    const savedComplaint = await newComplaint.save();

    // Send email notification
    const mailOptions = {
      from: "arvindm.22cse@kongu.edu",
      to: "arvindmurugesan001@gmail.com", // Replace with the actual recipient(s)
      subject: "New Complaint Submitted",
      text: `Complaint Details:\nName: ${name}\nEmail: ${email}\nRoom No: ${roomno}\nComplaint: ${comp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Complaint email sent successfully");

    res.status(201).json({ success: true, data: savedComplaint, message: "Complaint submitted and email sent" });
  } catch (error) {
    console.error("Error handling complaint:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
