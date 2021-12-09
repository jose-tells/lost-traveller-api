const joi = require('joi');

const rankingIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const rankingSchema = {
  rankName: joi.string().required(),
  rankEmoji: joi.string().uri().required()
}

module.exports = {
  rankingIdSchema,
  rankingSchema
}