const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const authMiddleware = async (req, res, next) => {
   
    try {
        const token = req.cookies.token;
        if (!token) {
    
            return res.status(401).json({ message: "No token, auth denied" })
        }

        const tokenDetails = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(tokenDetails.id)
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: "authorization denied invalid token" })
    }

}

module.exports = authMiddleware