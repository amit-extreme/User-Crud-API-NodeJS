const Joi = require("joi");
module.exports.createUserValidator = (body) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    address: Joi.string().allow("").max(2000),
    contact_number: Joi.string().length(10),
  });
  return schema.validate(body, { abortEarly: false });
};
