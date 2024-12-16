const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } = require("./emailTemplate");
const sendEMail = require("./nodemailer");

const sendVerificationEmail = async (email, verificationToken, next) => {
  
    try {

      


      const res =   await sendEMail(email, "Verfiy your email", VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken))

     
    } catch (error) {
        console.log(error)
        next(error);
    }

}




const sendResetPasswordEmail = async (email, resetUrl, next) => {
   
    try {



        const res =   await sendEMail(email, "reset your password", PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl))

    } catch (error) {
        console.log(error)
        next(error);
    }

}


const sendResetPasswordsuccessEmail = async (email, resetUrl, next) => {
   
    try {


        const res =   await sendEMail(email, "password reset  successfuly",PASSWORD_RESET_SUCCESS_TEMPLATE)


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