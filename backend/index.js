const config = require("dotenv").config()
const express = require("express")
const cors = require('cors');
const connectToDB = require("./config/connectToDB")
const errorMiddleware = require("./middleware/errorMiddleware")
const app = express()
const Port = process.env.PORT
const coockieParser = require("cookie-parser")


//config
app.use(express.json())
app.use(coockieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

connectToDB()

coockieParser



// routes
app.use('/api/auth', require("./routes/authRoute"))





app.use(errorMiddleware)

app.listen(Port, () => {
    console.log(`server is running on port ${Port}`)
})