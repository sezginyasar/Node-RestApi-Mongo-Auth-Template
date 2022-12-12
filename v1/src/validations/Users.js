const Joi = require('joi');

// console.log(`\x1b[31m\x1b[46m validation 1 \x1b[0m`);
const createValidation = Joi.object({
    full_name: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
    email: Joi.string().email().required().min(8),
});

const loginValidation = Joi.object({
    password: Joi.string().required().min(8),
    email: Joi.string().email().required().min(8),
});

const resetPasswordValidation = Joi.object({
    email: Joi.string().email().required().min(8),
});
// console.log(`\x1b[31m\x1b[46m validation 2 \x1b[0m`);

const updateValidation = Joi.object({
    full_name: Joi.string().min(3),
    email: Joi.string().email().min(8),
});

const changePasswordValidation = Joi.object({
    password: Joi.string().required().min(8),
});

const profileImageValidation = Joi.object({
    profile_image: Joi.string().required().min(8),
});

module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    updateValidation,
    changePasswordValidation,
    profileImageValidation,
};