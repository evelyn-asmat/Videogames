require('dotenv').config();
const axios = require("axios");
const { Genre } = require('../db.js');
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const getGenres = async (req, res) => {
    try {
        let allGenres = await Genre.findAll();
        if (!allGenres.length){
            const { data } = await axios(URL);
            const genres = data.results.map(genre => ({ name: genre.name }));
            allGenres = await Genre.bulkCreate(genres);
        }
        res.json(allGenres);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getGenres;