const axios = require("axios");
const { Genre } = require('../db.js');
const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const getGenres = async () => {
    let allGenres = await Genre.findAll({
        order: [['name', 'ASC']]
    });
    if (!allGenres.length){
        const { data } = await axios(API_URL);
        const genres = data.results.map(genre => ({ name: genre.name }));
        allGenres = await Genre.bulkCreate(genres);
        allGenres = await Genre.findAll({
            order: [['name', 'ASC']]
        });
    }
    return allGenres;
}

module.exports = {
    getGenres
}