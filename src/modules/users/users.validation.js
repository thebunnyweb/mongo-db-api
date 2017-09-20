import Joi from 'joi';

export default {
    userpostvalidation: {
        
            email: Joi.string().email().required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().min(6).required(),
        
    }
}