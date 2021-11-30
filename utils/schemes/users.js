const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const userFirstNameSchema = joi.string().max(50);
const userLastNameSchema = joi.string().max(50);
const userUsernameSchema = joi.string().max(50);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().min(8);
const userProfilePhotoSchema = joi.string().uri();
const userVerifiedSchema = joi.boolean();
const userContributionsSchema = joi.object();

const userSchema = {
  firstName: userFirstNameSchema.required(),
  lastName: userLastNameSchema.required(),
  username: userUsernameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  profilePhoto: userProfilePhotoSchema,
  verified: userVerifiedSchema.required(),
  contributions: userContributionsSchema.required()
};

const createUserSchema = {
  ...userSchema,
  isAdmin: joi.boolean()
}

const updateUserSchema = {
  firstName: userFirstNameSchema,
  lastName: userLastNameSchema,
  username: userUsernameSchema,
  email: userEmailSchema,
  password: userPasswordSchema,
  profilePhoto: userProfilePhotoSchema,
  verified: userVerifiedSchema,
  contributions: userContributionsSchema,
}

module.exports = {
  userIdSchema,
  userSchema,
  createUserSchema,
  updateUserSchema
};
