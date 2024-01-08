const { Router } = require('express');
const getGenres = require('../controllers/getGenres');
const getVideogames = require('../controllers/getVideogames');
const getDetailVideogame = require('../controllers/getDetailVideogame');
const saveVideogame = require('../controllers/saveVideogame');
const getPlatforms = require('../controllers/getPlatforms');


const router = Router();

router.get('/genres', getGenres);
router.get('/platforms', getPlatforms);
router.get('/videogames', getVideogames);
router.get('/videogames/:idVideogame', getDetailVideogame);
router.post('/videogames/', saveVideogame);

module.exports = router;
