const { sendVerificationEmail, sendResetPasswordEmail, sendResetPasswordsuccessEmail } = require('../mailtrap/emails.js');
const User = require('../models/UserModel.js')
const generateTokensAndSetcookie = require("../utils/generateTokensAndSetcookie")
const { signUpBodyValidation, loginBodyValidation, verfiyBodyValidation } = require("../utils/validationSchema")
const bcrypt = require('bcrypt')
const crypto = require("crypto");


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

        await sendVerificationEmail(user.email, verificationToken, next)


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


const verifyEmail = async (req, res, next) => {
    try {
        // 1. Input Validation
        const { error } = verfiyBodyValidation(req.body);
        if (error) { throw error.details[0].message; }

        const { code } = req.body;


        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();


        res.status(200).json({
            success: true,
            message: "email verified successfully",
            // user: {
            //     ...user._doc,
            //     password: undefined,
            // },
        });

    } catch (error) {
        next(error);
    }
};


const logout = async (req, res, next) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            success: true,
            message: "logged out successfully",

        });

    } catch (error) {
        next(error);
    }
};



const resetPasswordReq = async (req, res, next) => {
    try {


        const { email } = req.body;

        const user = await User.findOne({ email });



        const resetPasswordToken = crypto.randomBytes(20).toString("hex");

        const verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000//24hrs

        user.resetPasswordToken = resetPasswordToken
        user.verificationTokenExpiresAt = verificationTokenExpiresAt

        await user.save()



        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`, next)


        res.status(201).json({
            success: true,
            message: "reset password email sent successfully",
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};




const resetPassword = async (req, res, next) => {
    try {


        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ resetPasswordToken: token, verificationTokenExpiresAt: { $gt: Date.now() } });

        if (!user) return res.status(400).json({ success: false, message: "invalid or expired token" })

        user.resetPasswordToken = undefined

        user.verificationTokenExpiresAt = undefined

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword

        await user.save()



        await sendResetPasswordsuccessEmail(user.email, next)


        res.status(201).json({
            success: true,
                message: " password reset successfully",
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};


module.exports = {
    signup,
    login,
    verifyEmail,
    logout,
    resetPasswordReq,
    resetPassword,


}