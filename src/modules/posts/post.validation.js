import Joi from 'joi';

export default {
    createpost:{
        body:{
            title: Joi.string().required(),
            text: Joi.string().min(6).required(),
            author: Joi.string().required(),
            genre: Joi.string()
        }
    }
}