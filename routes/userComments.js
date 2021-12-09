const express = require('express');
const UserCommentsService = require('../services/userComments');

function userComments(app) {
  const router = express.Router();
  app.use('/api/user-comments', router);

  const userCommentsService = new UserCommentsService();

  router.get('/', async (req, res, next) => {
    const { userId } = req.query;
    try {
      const userComments = await userCommentsService.getUserComments({ userId });

      res.status(200).json({
        data: userComments,
        message: 'User comments listed'
      })
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async(req, res, next) => {
    const { body: userComment } = req;
    try {
      const createdUserComment = await userCommentsService.createUserComment({ userComment });

      res.status(201).json({
        data: createdUserComment,
        message: 'User comment created'
      })
    } catch (err) {
      next(err);
    }
  })

  router.delete('/', async(req, res, next) => {
    const { body: userComment } = req;
    try {
      const deletedUserComment = await userCommentsService.deleteUserComment({ userComment });

      res.status(201).json({
        data: deletedUserComment,
        message: 'User comment deleted'
      })
    } catch (err) {
      next(err);
    }
  })
}

module.exports = userComments;