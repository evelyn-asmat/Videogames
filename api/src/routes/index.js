const { Router } = require('express');
const getGenres = require('../controllers/getGenres');


const router = Router();

router.use('/genres', getGenres);


module.exports = router;
