const User = require('../models/UserModel.js')
const generateTokensAndSetcookie = require("../utils/generateTokensAndSetcookie")
const { signUpBodyValidation, loginBodyValidation } = require("../utils/validationSchema")
const bcrypt = require('bcrypt')


const signup = async (req, res, next) => {
    try {
        // 1. Input Validation
        const { error } = signUpBodyValidation(req.body);
        if (error) { throw error.details[0].message; }

        const { name, email, password } = req.body;

        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ message: 'user already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const verificationToken = Math.floor(100000 + Math.random() * 99999).toString();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        generateTokensAndSetcookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken)


        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        // 1. Input Validation
        const { error } = loginBodyValidation(req.body);
        if (error) { throw error.details[0].message; }

        const { email, password } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokensAndSetcookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    signup,
    login
}