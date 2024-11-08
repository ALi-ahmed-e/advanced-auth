const joi = require('joi')

const signUpBodyValidation = (body) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()
    })
    return schema.validate(body)
}

const loginBodyValidation = (body) => {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    })
    return schema.validate(body)
}

const verfiyBodyValidation = (body) => {
    const schema = joi.object({
        code: joi.string().required(),
    })
    return schema.validate(body)
}




module.exports=  {
    signUpBodyValidation,
    loginBodyValidation,
    verfiyBodyValidation,

    
}