const config = require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/connectToDB")
const errorMiddleware = require("./middleware/errorMiddleware")
const app = express()
const Port = process.env.PORT


//config
app.use(express.json())
connectToDB()





// routes
app.use('/api/auth',require("./routes/authRoute"))





app.use(errorMiddleware)

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})