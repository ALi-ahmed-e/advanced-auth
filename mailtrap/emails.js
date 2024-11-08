const { client, sender } = require("./mailtrap.config");
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } = require("./emailTemplate");

const sendVerificationEmail = async (email, verificationToken, next) => {
    const recipients = [
        {
            email,
        }
    ];
    try {

        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "verfiy your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),

        })

    } catch (error) {
        console.log(error)
        next(error);
    }

}




const sendResetPasswordEmail = async (email, resetUrl, next) => {
    const recipients = [
        {
            email,
        }
    ];
    try {





        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),

        })

    } catch (error) {
        console.log(error)
        next(error);
    }

}


const sendResetPasswordsuccessEmail = async (email, resetUrl, next) => {
    const recipients = [
        {
            email,
        }
    ];
    try {





        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "password reset  successfuly",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,

        })

    } catch (error) {
        console.log(error)
        next(error);
    }

}





module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail,
    sendResetPasswordsuccessEmail,

}