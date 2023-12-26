require('dotenv').config();
const axios = require("axios");
const { Videogame } = require('../db.js');
const { Op } = require('sequelize');
const { Genre } = require('../db.js');
const { API_KEY } = process.env;
let URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideogames = async (req, res) => {
    const { name } = req.query;
    try {
        let videogamesDb;
        if (name) {
            videogamesDb = await Videogame.findAll({
                include: {
                    model: Genre,
                    as: 'genres',
                    through: {
                        attributes: []
                    }
                },
                attributes: { exclude: ['description'] },
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                },
                limit: 15
            });
            URL = `${URL}&search=${name}&page_size=15`;
        } else {
            videogamesDb = await Videogame.findAll({
                include: {
                    model: Genre,
                    as: 'genres',
                    through: {
                        attributes: []
                    }
                },
                attributes: { exclude: ['description'] } 
            });
            URL = `${URL}&page_size=10`;
        }
        const { data } = await axios(URL);
        const videogamesApi = data.results.map(v => ({ 
            id: v.id,
            name: v.name,
            platforms: v.platforms.map(p => (p.platform.name)),
            image: v.background_image,
            released: v.released,
            rating: v.rating,
            genres: v.genres.map(g => ({id:g.id, name:g.name})),
        }));
        res.json([...videogamesDb, ...videogamesApi]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getVideogames;