const joi = require('joi');
const { rankingIdSchema } = require('./rankings');
const { postIdSchema } = require('./posts');

const postsRankingsIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const rankStatusSchema = joi.number().min(0).max(100);
const rankEmojiSchema = joi.array();
const userCreatorSchema = joi.object();

const postRankingSchema = {
  rankId: rankingIdSchema.required(),
  postId: postIdSchema.required(),
  rankStatus: rankStatusSchema.required(),
  rankEmoji: rankEmojiSchema.required(),
  userCreator: userCreatorSchema.required(),
}

const updatePostRankingSchema = {
  rankId: rankingIdSchema,
  postId: postIdSchema,
  rankStatus: rankStatusSchema,
  rankEmoji: rankEmojiSchema,
  userCreator: userCreatorSchema,
}

module.exports = {
  postsRankingsIdSchema,
  postRankingSchema,
  updatePostRankingSchema
}