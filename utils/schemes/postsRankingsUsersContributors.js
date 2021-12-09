const joi = require('joi');
const { userIdSchema, updateUserSchema } = require('./users');
const { postsRankingsIdSchema } = require('./postRankings');

const postsRankingsUsersContributorsIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const rateNumberSchema = joi.number().min(0).max(100);

const postsRankingsUsersContributorsSchema = {
  postRankingId: postsRankingsIdSchema.required(),
  userId: userIdSchema.required(),
  username: updateUserSchema.username.required(),
  rateNumber: rateNumberSchema.required(),
}

const updatePostsRankingsUsersContributorsSchema = {
  postRankingId: postsRankingsIdSchema,
  userId: userIdSchema,
  username: updateUserSchema.username,
  rateNumber: rateNumberSchema,
}

module.exports = {
  postsRankingsUsersContributorsIdSchema,
  postsRankingsUsersContributorsSchema,
  updatePostsRankingsUsersContributorsSchema
}