const nodemailer = require('nodemailer')

const sendEMail = async (Email, subject, htmlTemplate) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.APP_EMAIL_ADDRESS,
                pass: process.env.APP_EMAIL_PASS
            }
        })

        const options = {
            from: process.env.APP_EMAIL_ADDRESS,
            to: Email,
            subject,
            html: htmlTemplate,
        }

        const info = await transporter.sendMail(options)

        return info

    } catch (error) {
        console.log(error)
        return error
    }
}
module.exports = sendEMail