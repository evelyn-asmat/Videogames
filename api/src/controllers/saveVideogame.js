require('dotenv').config();
const axios = require("axios");
const { Videogame } = require('../db.js');

const saveVideogame = async (req, res) => {
    try {
        const { name, description, platforms, image, released, rating, genres } = req.body;
        if (!name || !description || !platforms || !image || !released || !rating){
            return res.status(400).send("Incompleted fields.");
        }
        const videogame = await Videogame.create({name, description, platforms, image, released, rating});
        let videogameGenres = []
        if (genres) {
            await videogame.addGenres(genres);
            videogameGenres = await videogame.getGenres()
        }

        res.json({...videogame.dataValues, genres: videogameGenres.map(v => (v.name))});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = saveVideogame;