import AdminSignup from "../models/logadmin.models.js";

export const create_account_admin = async (req, res) => {
    const data = req.body;
    if (!data.name || !data.email || !data.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newdata = new AdminSignup(data);
    try {
        await newdata.save();
        res.status(201).json({ success: true, data: newdata });
    } catch (err) {
        console.error("Error creating account:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Controller to handle user sign-in
export const signin_admin = async (req, res) => {
    const { email, password } = req.body;

    // Admin credentials check
    // if (email === 'admin@gmail.com' && password === '123') {
    //     return res.status(200).json({ success: true, message: "Signed in successfully", isAdmin: true });
    // }


    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }

    try {
        const user = await AdminSignup.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Account not found. Please sign up." });
        }

        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Incorrect email or password" });
        }

        return res.status(200).json({ success: true, message: "Signed in successfully", data: user });
    } catch (error) {
        console.error("Error in sign-in:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};