const express = require('express');
const UsersService = require('../services/users');
// Middleware
const validationHandler = require('../utils/middlewares/validationHandler');
// Schemas
const { userIdSchema, userSchema } = require('../utils/schemes/users')


function users(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  // It shouldn't be an endpoint to get "users".
  router.get('/', async (req, res, next) => {
    try {
      const users = await usersService.getUsers();
      res.status(200).json({
        data: users,
        message: 'Users listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:userId', validationHandler({ userId: userIdSchema }, 'params'), async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await usersService.getUser(userId);

      const { user_id, first_name, last_name, alias } = user;

      res.status(200).json({
        data: {
          id: user_id,
          firstName: first_name,
          lastName: last_name,
          username: alias,
        },
        message: 'User retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', validationHandler(userSchema), async (req, res, next) => {
    const { password, first_name, last_name, alias, email } = req.body;

    const user = {
      password,
      first_name,
      last_name,
      alias,
      email,
    }

    try {
      const userId = await usersService.createUser(user)
      res.status(201).json({
        data: userId,
        message: 'User Created'
      })
    } catch (err) {
      next(err)
    }
  });

  router.delete('/:userId', validationHandler({ userId: userIdSchema }, 'params'), async (req, res, next) => {
    const { userId } = req.params;

    try {
      const deletedUserId = await usersService.deleteUser(userId);

      res.status(200).json({
        data: deletedUserId,
        message: 'User deleted'
      })
    } catch (err) {
      next(err);
    }
  })
};


module.exports = users;