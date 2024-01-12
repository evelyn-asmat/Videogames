require('dotenv').config();
const axios = require("axios");
const { Videogame } = require('../db.js');
const { Op } = require('sequelize');
const { Genre, Platform } = require('../db.js');
const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`;

const getVideogames = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const { name, order, genre, origin } = req.query;

    try {
        let videogamesDb;
        if (name && name !== "") {
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
                order: [
                    [{ model: Genre, as: 'genres' }, 'name', 'ASC']
                ]
            });
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
        }
        const { data } = await axios(`${API_URL}&search=${name}`);
        const videogamesApi = data.results && data.results.map(v => ({ 
            id: v.id,
            name: v.name,
            platforms: v.platform && v.platforms.map(p => p.platform.name),
            image: v.background_image,
            released: v.released,
            rating: v.rating,
            genres: v.genres && v.genres.map(g => ({ id: g.id, name: g.name })).sort(),
        }));
        
        Platform.count()
        .then((count) => {
            if (count === 0) {
                    const platforms = new Set(videogamesApi.flatMap(game => game.platforms));
                    const allPlatforms = [...platforms].map(platformName => ({ name: platformName }));
                    return Platform.bulkCreate(allPlatforms.sort((a, b) =>  a.name.toLowerCase().localeCompare(b.name.toLowerCase())));
                }
            });
        
        const allVideogames = [...videogamesDb, ...videogamesApi];
        allVideogames.forEach(game => {
            if (Array.isArray(game.platforms)) {
              game.platforms.sort((a, b) =>  a.toLowerCase().localeCompare(b.toLowerCase()));
            }
        });

        const startIndex = (page - 1) * limit;
        if (name) {
            res.header('total-videogames', allVideogames.length > 15 ? limit : allVideogames.length);
            return res.json(allVideogames.slice(0,limit));
        } else {
            res.header('total-videogames', allVideogames.length);
            return res.json(allVideogames.slice(startIndex, startIndex + limit));
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getVideogames;