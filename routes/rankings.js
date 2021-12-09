const express = require('express');
const RankingsServices = require('../services/rankings');
const validationHandler = require('../utils/middlewares/validationHandler');
const { rankingSchema, rankingIdSchema } = require('../utils/schemes/rankings');
const scopeValidationHandler = require('../utils/middlewares/scopeValidationHandler');
const passport = require('passport');
require('../utils/auth/strategies/jwt');

function rankings(app) {
  const router = express.Router();
  app.use('/api/rankings', router);

  const rankingsServices = new RankingsServices();

  router.get('/', async (req, res, next) => {
    const { postId } = req.query;
    try {
      const rankings = await rankingsServices.getRankings(postId);

      res.status(200).json({
        data: rankings,
        message: 'Rankings listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler('[create:posts]'),
    validationHandler(rankingSchema),
    async (req, res, next) => {
      const { body: ranking } = req;
      try {
        const createdRanking = await rankingsServices.createRanking({ ranking });

        res.status(201).json({
          data: createdRanking,
          message: 'Ranking created',
        });
      } catch (err) {
        next(err);
      }
    });

  router.delete('/:rankingId',
    passport.authenticate('jwt', { session: false }),
    scopeValidationHandler('[delete:posts]'),
    validationHandler({ rankingId: rankingIdSchema }, 'params'),
    async (req, res, next) => {
      const { rankingId } = req.params;
      try {
        const deletedRanking = await rankingsServices.createRanking(rankingId);

        res.status(200).json({
          data: deletedRanking,
          message: 'Ranking deleted',
        });
      } catch (err) {
        next(err);
      }
    });
};

module.exports = rankings;