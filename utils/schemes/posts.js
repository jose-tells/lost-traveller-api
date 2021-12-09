const joi = require('joi');

const postIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const postTitleSchema = joi.string().max(50);
const postProvinceSchema = joi.string().max(50);
const postAveragePriceSchema = joi.number();
const postPhotoSchema = joi.string().uri();
const postWeatherSchema = joi.object();
const postUserCreatorSchema = joi.object();
const postUsersContributorsSchema = joi.array();
const postRankingsSchema = joi.array();
const postReviewSchema = joi.string().min(50).max(200);
const postCommentsSchema = joi.array();

const postSchema = {
  title: postTitleSchema.required(),
  province: postProvinceSchema.required(),
  averagePrice: postAveragePriceSchema.required(),
  photo: postPhotoSchema.required(),
  weather: postWeatherSchema.required(),
  userCreator: postUserCreatorSchema.required(),
  usersContributors: postUsersContributorsSchema,
  rankings: postRankingsSchema,
  review: postReviewSchema.required(),
  comments: postCommentsSchema,
};

const updatePostSchema = {
  title: postTitleSchema,
  province: postProvinceSchema,
  averagePrice: postAveragePriceSchema,
  photo: postPhotoSchema,
  weather: postWeatherSchema,
  userCreator: postUserCreatorSchema,
  usersContributors: postUsersContributorsSchema,
  rankings: postRankingsSchema,
  review: postReviewSchema,
  comments: postCommentsSchema,
};

module.exports = {
  postIdSchema,
  postSchema,
  updatePostSchema
}
