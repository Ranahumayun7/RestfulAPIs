// controllers/userController.js
const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    console.log("Received data:", { name, email });

    try {
        const newUser = new User({ name, email });
        const user = await newUser.save();
        console.log("User created:", user);
        res.status(201).json(user);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(400).json({ message: err.message });
    }
};