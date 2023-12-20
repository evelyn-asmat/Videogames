const { Router } = require('express');
const getGenres = require('../controllers/getGenres');
const getVideogames = require('../controllers/getVideogames');
const getDetailVideogame = require('../controllers/getDetailVideogame');


const router = Router();

router.get('/genres', getGenres);
router.get('/videogames', getVideogames);
router.get('/videogames/:idVideogame', getDetailVideogame);

module.exports = router;
