const express = require('express');
const UsersService = require('../services/users')
const { userSchema } = require('../utils/schemes/users');
const validationHandler = require('../utils/middlewares/validationHandler');

function users(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.get('/:username', validationHandler({ username: userSchema.username }, 'params'), async (req, res, next) => {
    const { username } = req.params;
    try {
      const user = await usersService.getUserByUsername({ username })

      const { _id: id, firstName, lastName, verified, contributions, profilePhoto } = user;

      res.status(200).json({
        data: {
          id,
          firstName,
          lastName,
          username,
          verified,
          contributions,
          profilePhoto,
        },
        message: 'User retrieved'
      });
    } catch (err) {
      next(err);
    };
  });
};

module.exports = users;