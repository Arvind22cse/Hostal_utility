import Announcement from "../models/Announcement.models.js"
export const create_announce= async (req, res) => {
    const data = req.body;
    console.log("Received announce data:", data); // Log the data received
    if (!data.text) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newdata = new Announcement(data);
    try {
        const savedannounce = await newdata.save();
        console.log("text saved:", savedannounce); // Log saved complaint
        res.status(201).json({ success: true, data: savedannounce });
    } catch (err) {
        console.error("Error creating:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const get_announcement = async (req, res) => {
    try {
        const acc = await Announcement.find();
        res.status(200).json({ success: true, data: acc });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};