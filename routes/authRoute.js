const { signup, login } = require("../controllers/authController")

const Router = require("express").Router()


Router.post('/signup', signup)

Router.post('/login',login)

Router.post('/logout', (req, res) => res.json('testtt'))


module.exports = Router