require('dotenv').config();
const { API_KEY } = process.env;

const axios = require("axios");
const { Op } = require('sequelize');
const { Genre, Videogame } = require('../db.js');
const { saveIfNoPlatforms } = require('./platformsController.js');

const API_URL = `https://api.rawg.io/api/games`;
const GAMES_URL = `${API_URL}?key=${API_KEY}&page_size=40`;


const getDetailAPI = async (idVideogame) => {
    const endpoint = `${API_URL}/${idVideogame}?key=${API_KEY}`;
    const { data } = await axios(endpoint);
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        platforms: data.platforms.map(p => (p.platform.name)),
        image: data.background_image,
        released: data.released,
        rating: data.rating,
        genres: data.genres.map(g => ({ id: g.id, name: g.name })),
    }
}

const getDetailDB = async (idVideogame) => {
    return await Videogame.findByPk(idVideogame, {
        include: {
            model: Genre,
            as: 'genres',
            through: {
                attributes: []
            }
        }
    });
}

const getVideogamesAPI = async (name) => {
    const { data } = await axios(`${GAMES_URL}&search=${name}`);
    const videogamesApi = data.results && data.results.map(v => ({
        id: v.id,
        name: v.name,
        platforms: v.platform && v.platforms.map(p => p.platform.name),
        image: v.background_image,
        released: v.released,
        rating: v.rating,
        genres: v.genres && v.genres.map(g => ({ id: g.id, name: g.name })).sort(),
    }));

    videogamesApi.forEach(game => {
        if (Array.isArray(game.platforms)) {
            game.platforms.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        }
    });

    return videogamesApi;
}

const getVideogamesDB = async (name) => {
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
            attributes: { exclude: ['description'] },
            order: [
                [{ model: Genre, as: 'genres' }, 'name', 'ASC']
            ]
        });
    }

    videogamesDb.forEach(game => {
        if (Array.isArray(game.platforms)) {
            game.platforms.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        }
    });

    return videogamesDb;
}

const getVideogamesAll = async (name) => {
    const videogamesDB = await getVideogamesDB(name);
    const videogamesAPI = await getVideogamesAPI(name);

    await saveIfNoPlatforms(videogamesAPI);

    return [...videogamesDB, ...videogamesAPI];
}

const saveVideogame = async (name, description, image, platforms, released, rating, genres) => {
    const videogame = await Videogame.create({
        name,
        description,
        platforms,
        image,
        released,
        rating
    });

    let videogameGenres = []
    if (genres) {
        await videogame.addGenres(genres);
        videogameGenres = await videogame.getGenres();
    }

    return { ...videogame.dataValues, genres: videogameGenres ? videogameGenres.map(v => (v.name)) : videogameGenres }
}

const sortVideogamesByName = (videogames, sortingOrder) => {
    if (sortingOrder == "ASC"){
        videogames.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    } else {
        videogames.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
    }
}

const sortVideogamesByRating = (videogames, sortingOrder) => {
    if (sortingOrder == "ASC"){
        videogames.sort((a, b) => a.rating - b.rating);
    } else {
        videogames.sort((a, b) => b.rating - a.rating);
    }
}

module.exports = {
    getDetailAPI,
    getDetailDB,
    getVideogamesAPI,
    getVideogamesDB,
    getVideogamesAll,
    saveVideogame,
    sortVideogamesByName,
    sortVideogamesByRating
}