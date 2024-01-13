const { Router } = require('express');
const { getVideogamesHandler, getDetailVideogameHandler, saveVideogameHandler } = require('../handlers/videogamesHandler');

const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesHandler);
videogamesRouter.get('/:idVideogame', getDetailVideogameHandler);
videogamesRouter.post('/', saveVideogameHandler);

module.exports = videogamesRouter;
