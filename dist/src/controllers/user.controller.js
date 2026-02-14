"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const getProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone, avatar } = req.body;
        const user = await User_1.default.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (firstName)
            user.firstName = firstName;
        if (lastName)
            user.lastName = lastName;
        if (phone)
            user.phone = phone;
        if (avatar)
            user.avatar = avatar;
        await user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateProfile = updateProfile;
