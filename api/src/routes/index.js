const { Router } = require('express');
const genresRouter = require('./genresRouter');
const platformsRouter = require('./platformsRouter');
const videogamesRouter = require('./videogamesRouter');

const router = Router();

router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);
router.use('/videogames', videogamesRouter);

module.exports = router;
