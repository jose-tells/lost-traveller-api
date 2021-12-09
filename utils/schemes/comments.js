const joi = require('joi');
const { postIdSchema } = require('../schemes/posts');

const commentIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const commentSchema = {
  content: joi.string().required(),
  postId: postIdSchema.required(),
  userCreator: joi.object().required(),
  replies: joi.array(),
  date: joi.date().iso().required()
};

module.exports = {
  commentIdSchema,
  commentSchema,
}