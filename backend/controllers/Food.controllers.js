import Food from "../models/food.model.js";
export const create_food = async (req, res) => {
    const data = req.body;
    console.log("Received complaint data:", data); // Log the data received
    if (!data.foodname || !data.time || !data.img) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newdata = new Food(data);
    try {
        const savedfood = await newdata.save();
        console.log("food saved:", savedfood); // Log saved complaint
        res.status(201).json({ success: true, data: savedfood });
    } catch (err) {
        console.error("Error creating complaint:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const get_food = async (req, res) => {
    try {
        const food = await Food.find();
        res.status(200).json({ success: true, data: food });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
