"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const validators_1 = require("../utils/validators");
const register = async (req, res) => {
    try {
        const validatedData = validators_1.registerSchema.parse(req.body);
        const userExists = await User_1.default.findOne({ email: validatedData.email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User_1.default.create(validatedData);
        const token = (0, jwt_1.generateToken)(user._id.toString());
        res.status(201).json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const validatedData = validators_1.loginSchema.parse(req.body);
        const user = await User_1.default.findOne({ email: validatedData.email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(validatedData.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = (0, jwt_1.generateToken)(user._id.toString());
        res.json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
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
exports.getMe = getMe;
