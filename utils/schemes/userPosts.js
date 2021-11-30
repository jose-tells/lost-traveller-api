const joi = require('joi');

const { postIdSchema } = require('./posts');
const { userIdSchema } = require('./users');

const userPostIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserPostSchema = {
  userId: userIdSchema,
  postId: postIdSchema,
};

module.exports = {
  userIdSchema,
  userPostIdSchema,
  createUserPostSchema,
}