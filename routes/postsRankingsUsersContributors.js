const express = require('express');
const passport = require('passport');
const scopeValidationHandler = require('../utils/middlewares/scopeValidationHandler');
const PostsRankingsUsersContributorsService = require('../services/postsRankingsUsersContributors');
const validationHandler = require('../utils/middlewares/validationHandler');
const { postsRankingsUsersContributorsIdSchema, postsRankingsUsersContributorsSchema, updatePostsRankingsUsersContributorsSchema } = require('../utils/schemes/postsRankingsUsersContributors')
require('../utils/auth/strategies/jwt');

function postsRankingsUsersContributors(app) {
  const router = express.Router();
  app.use('/api/posts-rankings/users-contributors', router);

  const collection = 'Post ranking user contributor ';

  const postsRankingsUsersContributorsService = new PostsRankingsUsersContributorsService();
  router.get('/', async (req, res, next) => {
    const { postRankingId } = req.query;
    try {
      const postsRankingsUsersContributors = await postsRankingsUsersContributorsService.getPostsRankingsUsersContributors(postRankingId);

      res.status(200).json({
        data: postsRankingsUsersContributors,
        message: 'Posts rankings users contributors listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler('[create:user-posts]'),
    validationHandler(postsRankingsUsersContributorsSchema),
    async (req, res, next) => {
      const { body: userContributor } = req;
      try {
        const createdPostRankingUserContributor = await postsRankingsUsersContributorsService.createPostsRankingsUsersContributors({ userContributor });

        res.status(201).json({
          data: createdPostRankingUserContributor,
          message: `${collection} created`
        })
      } catch (err) {
        next(err);
      }
    });

  router.patch('/:userContributorId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler('[update:user-posts]'),
    validationHandler({ userContributorId: postsRankingsUsersContributorsIdSchema }, 'params'),
    validationHandler(updatePostsRankingsUsersContributorsSchema),
    async (req, res, next) => {
      const { userContributorId } = req.params;
      const { body: userContributor } = req;
      try {
        const updatedPostRankingUserContributor = await postsRankingsUsersContributorsService.updatePostsRankingsUsersContributors({ userContributorId, userContributor });

        res.status(200).json({
          data: updatedPostRankingUserContributor,
          message: `${collection} updated`
        })
      } catch (err) {
        next(err);
      }
    })

  router.delete('/:userContributorId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler('[delete:user-posts]'),
    validationHandler({ userContributorId: postsRankingsUsersContributorsIdSchema }, 'params'),
    async (req, res, next) => {
      const { userContributorId } = req.params;
      try {
        const deletedPostRankingUserContributor = await postsRankingsUsersContributorsService.deletePostsRankingsUsersContributors(userContributorId);

        res.status(200).json({
          data: deletedPostRankingUserContributor,
          message: `${collection} deleted`
        })
      } catch (err) {
        next(err);
      }
    })
};

module.exports = postsRankingsUsersContributors;