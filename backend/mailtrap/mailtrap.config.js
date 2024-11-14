const config = require("dotenv").config()

const { MailtrapClient } = require("mailtrap");

// const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN,
    endpoint: process.env.MAILTRAP_ENDPOINT
});

const sender = {
    email: "hello@demomailtrap.com",
    name: "account config",
};
module.exports ={client,sender}

// const recipients = [
//     {
//         email: "aa5325368@gmail.com",
//     }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);