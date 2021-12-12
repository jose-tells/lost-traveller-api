const express = require('express');
const PostsService = require('../services/posts');
const validationHandler = require('../utils/middlewares/validationHandler');
const { postIdSchema, postSchema, updatePostSchema } = require('../utils/schemes/posts');
// JWT validation
const passport = require('passport');
const scopeValidationHandler = require('../utils/middlewares/scopeValidationHandler');
require('../utils/auth/strategies/jwt');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

function posts(app) {
  const router = express.Router();
  app.use('/api/posts', router);

  const postsService = new PostsService();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { rankings } = req.query;
    try {
      const posts = await postsService.getPosts({ rankings });

      res.status(200).json({
        data: posts,
        message: 'Posts listed'
      })
    } catch (err) {
      next(err);
    }
  });

  router.get('/:postId',
    validationHandler({ postId: postIdSchema }, 'params'),
    async (req, res, next) => {
      const { postId } = req.params;
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

      try {
        const post = await postsService.getPost(postId);

        res.status(200).json({
          data: post,
          message: 'Post retrieved'
        })
      } catch (err) {
        next(err);
      }
    })

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['create:user-posts']),
    validationHandler(postSchema),
    async (req, res, next) => {
      const { body: post } = req;

      try {
        const createdPostId = await postsService.createPost({ post });

        res.status(201).json({
          data: createdPostId,
          message: 'Post created'
        })
      } catch (err) {
        next(err);
      }
    });

  router.patch('/:postId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['update:user-posts']),
    validationHandler({ postId: postIdSchema }, 'params'),
    validationHandler(updatePostSchema),
    async (req, res, next) => {
      const { postId } = req.params;
      const { body: post } = req;

      try {
        const updatedPostId = await postsService.updatePost({ postId, post });

        res.status(200).json({
          data: updatedPostId,
          message: 'Post updated'
        });
      } catch (err) {
        next(err)
      }
    })

  router.delete('/:postId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['delete:user-posts']),
    validationHandler({ postId: postIdSchema }, 'params'),
    async (req, res, next) => {
      const { postId } = req.params;
      try {
        const deletedPostId = await postsService.deletePost(postId);

        res.status(200).json({
          data: deletedPostId,
          message: 'Post deleted'
        })
      } catch (err) {
        next(err)
      }
    })
};

module.exports = posts;