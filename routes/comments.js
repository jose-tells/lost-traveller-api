const express = require('express');
const passport = require('passport');
const CommentsService = require('../services/comments');
const scopeValidationHandler = require('../utils/middlewares/scopeValidationHandler');
const validationHandler = require('../utils/middlewares/validationHandler');
const { commentIdSchema, commentSchema } = require('../utils/schemes/comments');

function comments(app) {
  const router = express.Router();
  app.use('/api/comments', router);

  const commentsService = new CommentsService();

  router.get('/', async (req, res, next) => {
    const { postId } = req.query;
    try {
      const comments = await commentsService.getComments({ postId });

      res.status(200).json({
        data: comments,
        message: 'Comments listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:commentId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['read:user-posts']),
    validationHandler({ commentId: commentIdSchema }, 'params'),
    async (req, res, next) => {
      const { commentId } = req.params;
      try {
        const comment = await commentsService.getComment(commentId);

        res.status(200).json({
          data: comment,
          message: 'Comment retrieved'
        })
      } catch (err) {
        next(err);
      }
    });

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['create:user-posts']),
    validationHandler(commentSchema),
    async (req, res, next) => {
      const { body: comment } = req;
      try {
        const createdComment = await commentsService.createComment({ comment });

        res.status(201).json({
          data: createdComment,
          message: 'Comment created'
        })
      } catch (err) {
        next(err);
      }
    });

  router.patch('/:commentId',
  passport.authenticate('jwt', { session: false }),
  scopeValidationHandler('[update:user-comments]'),
  validationHandler({ commentId: commentIdSchema }, 'params'),
  validationHandler(commentSchema),
    async (req, res, next) => {
      const { commentId } = req.params;
      const { body: comment } = req;
      try {
        const updatedCommentId = await commentsService.updateComment({ commentId, comment });

        res.status(200).json({
          data: updatedCommentId,
          message: 'Comment updated'
        })
      } catch (err) {
        next(err)
      }
    })

  router.delete('/:commentId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler(['delete:user-posts']),
    validationHandler({ commentId: commentIdSchema }, 'params'),
    async (req, res, next) => {
      const { commentId } = req.params;
      try {
        const deletedComment = await commentsService.deleteComment(commentId);

        res.status(200).json({
          data: deletedComment,
          message: 'Comment deleted'
        })
      } catch (err) {
        next(err)
      }
    })
};

module.exports = comments;
