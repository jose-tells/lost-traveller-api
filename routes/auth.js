const express = require('express');
const { authJwtSecret } = require('../config');
const boom = require('@hapi/boom');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// Middleware
const validationHandler = require('../utils/middlewares/validationHandler');
// Services
const UsersService = require('../services/users');
const ApiKeysService = require('../services/apiKeys');
// Schema
const { createUserSchema } = require('../utils/schemes/users');
// BasicStrategy
require('../utils/auth/strategies/basic');

function auth(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body;
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    };
    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) {
          return next(boom.unauthorized());
        }

        req.login(user, { session: false }, async (err) => {
          if(err) {
            return next(err);
          };

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if(!apiKey) {
            next(boom.unauthorized());
          };

          const { _id: id, firstName, lastName, username, email, profilePhoto, verified, contributions } = user;

          const payload = {
            sub: id,
            firstName,
            email,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, authJwtSecret, {
            expiresIn: '15min'
          });

          return res.status(200).json({
            token,
            user: {
              id,
              firstName,
              lastName,
              username,
              email,
              profilePhoto,
              verified,
              contributions
            }
          });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next)
  });

  router.post('/sign-up', validationHandler(createUserSchema), async(req, res, next) =>{
    const { body: user } = req;

    try {
      const createdUserId = await usersService.createUser({ user });

      res.status(201).json({
        data: createdUserId,
        message: 'User created'
      });
    } catch (err) {
      next(err)
    }
  })
};


module.exports = auth;