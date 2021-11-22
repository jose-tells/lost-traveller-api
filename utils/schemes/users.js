const joi = require('joi');

const userIdSchema = joi.number();

const userSchema = {
  first_name: joi.string().max(100).required(),
  last_name: joi.string().max(100).required(),
  email: joi.string().email().required(),
  alias: joi.string().max(100),
  password: joi.string().required(),
};

module.exports = {
  userIdSchema,
  userSchema,
};
