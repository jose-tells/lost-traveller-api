const express = require('express');
const PostsService = require('../services/posts');

function posts(app) {
  const router = express.Router();
  app.use('/api/posts', router);

  const postsService = new PostsService();

  router.get('/', async (req, res, next) => {
    try {
      const posts = await postsService.getPosts();

      res.status(200).json({
        data: posts,
        message: 'Posts listed'
      })
    } catch (err) {
      next(err);
    }
  });

  router.get('/:postId', async (req, res, next) => {
    const { postId } = req.params;

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

  router.post('/', async (req, res, next) => {
    const { id, userId, name, province, content, averagePrice, photo, weather, weatherEmoji, userCreators, userContributors, rankings, comments } = req.body;

    const post = {
      post_id: id,
      user_id: userId,
      title: name,
      province,
      content,
      averagePrice,
      photo,
      weather,
      weatherEmoji,
      user_creators: userCreators,
      user_contributors: userContributors,
      rankings,
      comments,
    };

    try {
      const postId = await postsService.createPost(post);

      res.status(201).json({
        data: postId,
        message: 'Post created'
      })
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:postId', async (req, res, next) => {
    const { postId } = req.params;
    try {
      const deletedPostId = await postsService.deletePost(postId);

      res.status(200).json({
        data: Number(deletedPostId),
        message: 'Post deleted'
      })
    } catch (err) {
      next(err)
    }
  })
};

module.exports = posts;