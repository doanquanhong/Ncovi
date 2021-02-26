const Joi = require('@hapi/joi');

// Register Validate
const registerValidation = function(data){
    const schema = Joi.object ({
        name: Joi.string()
                 .min(4)
                 .required(),
        number: Joi.number()
                   .required(),
    })
   return  schema.validate(data)
}
module.exports.registerValidation = registerValidation