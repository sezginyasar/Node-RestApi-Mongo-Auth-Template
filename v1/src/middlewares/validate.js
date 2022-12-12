const httpStatus = require("http-status");
const Joi = require("joi");

const validate = (schema) => (req, res, next) => {

    const { value, error } = schema.validate(req.body);
    if (error) {
        // console.log(`\x1b[31m\x1b[46m ${error} \x1b[0m`);
        const errorMessage = error.details?.map(detail => detail.message).join(", ");
        // console.log(`\x1b[31m\x1b[46m ${errorMessage} \x1b[0m`);
        res.status(httpStatus.BAD_REQUEST).json({ error: errorMessage });
        // console.log(`\x1b[31m\x1b[46m ${res.status} \x1b[0m`);

        return;
    };

    Object.assign(req, value);
    return next();
};

module.exports = validate;