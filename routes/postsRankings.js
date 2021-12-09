const express = require('express');
const PostsRankingsService = require('../services/postsRankings');
const validationHandler = require('../utils/middlewares/validationHandler');
const scopeValidationHandler = require('../utils/middlewares/scopeValidationHandler');
const {
  postsRankingsIdSchema,
  postRankingSchema,
  updatePostRankingSchema
} = require('../utils/schemes/postRankings');
const passport = require('passport');
require('../utils/auth/strategies/jwt');

function postsRankings(app) {
  const router = express.Router();
  app.use('/api/posts-rankings', router);
  const postsRankingsService = new PostsRankingsService();

  router.get('/', async (req, res, next) => {
    const { postId } = req.query;
    try {
      const postRankings = await postsRankingsService.getPostsRankings(postId);

      res.status(200).json({
        data: postRankings,
        message: 'Posts rankings listed'
      })
    } catch (err) {
      next(err);
    }
  })

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler('[create:users-posts]'),
    validationHandler(postRankingSchema),
    async (req, res, next) => {
      const { body: postRanking } = req;
      try {
        const createdPostRanking = await postsRankingsService.createPostRanking({ postRanking })

        res.status(201).json({
          data: createdPostRanking,
          message: 'Post ranking created'
        })
      } catch (err) {
        next(err);
      }
    });

  router.patch('/:postRankingId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler('[update:users-posts]'),
    validationHandler({ postRankingId: postsRankingsIdSchema }),
    validationHandler(updatePostRankingSchema),
    async (req, res, next) => {
      const { postRankingId } = req.params;
      const { body: postRanking } = req;
      try {
        const updatedPostRanking = await postsRankingsService.updatePostRankings({ postRankingId, postRanking });

        res.status(200).json({
          data: updatedPostRanking,
          message: 'Post ranking updated'
        })
      } catch (err) {
        next(err);
      }
    });

  router.delete('/:postRankingId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler('[delete:users-posts]'),
    validationHandler({ postRankingId: postRankingSchema }),
    async (req, res, next) => {
      const { postRankingId } = req.params;
      try {
        const deletedPostRanking = await postsRankingsService.deletePostRankings(postRankingId)

        res.status(200).json({
          data: deletedPostRanking,
          message: 'Post ranking deleted'
        })
      } catch (err) {
        next(err);
      }
    })
};

module.exports = postsRankings;
