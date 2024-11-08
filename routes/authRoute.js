const { signup, login, verifyEmail, logout,resetPasswordReq,resetPassword } = require("../controllers/authController")

const Router = require("express").Router()


Router.post('/signup', signup)

Router.post('/login', login)

Router.post('/verifiy-email', verifyEmail)

Router.post('/logout', logout)

Router.post('/reset-password-request', resetPasswordReq)

Router.post('/reset-password/:token', resetPassword)



module.exports = Router