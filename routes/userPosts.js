const express = require('express');
const UserPostsService = require('../services/userPosts');
const validationHandler = require('../utils/middlewares/validationHandler');
const {
  userIdSchema,
  createUserPostSchema,
  userPostIdSchema
} = require('../utils/schemes/userPosts');
// JWT validation
const passport = require('passport');
const scopeValidationHandler = require('../utils/middlewares/scopeValidationHandler');
require('../utils/auth/strategies/jwt');

function userPosts(app) {
  const router = express.Router();
  app.use('/api/user-posts', router);

  const userPostsService = new UserPostsService();

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['read:user-posts']),
    validationHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;
      try {
        const userPosts = await userPostsService.getUserPosts({ userId });

        res.status(200).json({
          data: userPosts,
          message: 'User posts listed'
        });
      } catch (err) {
        next(err)
      }
    });

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['create:user-posts']),
    validationHandler(createUserPostSchema),
    async (req, res, next) => {
      const { body: userPost } = req;
      try {
        const createdUserPost = await userPostsService.createUserPosts({ userPost });

        res.status(201).json({
          data: createdUserPost,
          message: 'User post created'
        })
      } catch (err) {
        next(err);
      }
    });

  router.delete('/:userPostId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['delete:user-posts']),
    validationHandler({ userPostId: userPostIdSchema }, 'params'),
    async (req, res, next) => {
      const { userPostId } = req.params;
      try {
        const deletedUserPostId = await userPostsService.deleteUserPost({ userPostId });

        res.status(200).json({
          data: deletedUserPostId,
          message: 'User post deleted'
        })
      } catch (err) {
        next(err);
      }
    })
};

module.exports = userPosts;