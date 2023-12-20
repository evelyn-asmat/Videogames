require('dotenv').config();
const axios = require("axios");
const { Videogame } = require('../db.js');
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`;

const getVideogames = async (req, res) => {
    try {
        const videogamesDb = await Videogame.findAll({ attributes: { exclude: ['description'] } });
        const { data } = await axios(URL);
        const videogamesApi = data.results.map(v => ({ 
            id: v.id,
            name: v.name,
            platforms: v.platforms.map(p => (p.platform.name)),
            image: v.background_image,
            released: v.released,
            rating: v.rating
        }));
        res.json([...videogamesDb, ...videogamesApi]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getVideogames;