require('dotenv').config();
const axios = require("axios");
const { Genre, Videogame } = require('../db.js');
const { API_KEY } = process.env;
const URL = "https://api.rawg.io/api/games";

const getDetailVideogame = async (req, res) => {
    const { idVideogame } = req.params;
    if (!idVideogame) {
        return res.status(400).send("ID required");
    }
    try {
        let videogame;
        if (Number.isInteger(Number(idVideogame))){
            // Get detail from API
            const endpoint = `${URL}/${idVideogame}?key=${API_KEY}`;
            const { data } = await axios(endpoint);
            videogame = {
                id: data.id,
                name: data.name,
                description: data.description,
                platforms: data.platforms.map(p => (p.platform.name)),
                image: data.background_image,
                released: data.released,
                rating: data.rating,
                genres: data.genres.map(g => ({id:g.id, name:g.name})),
            }
        } else {
            // Get detail from DB
            videogame = await Videogame.findByPk(idVideogame, {
                include: {
                    model: Genre,
                    as: 'genres',
                    through: {
                        attributes: []
                    }
                }
            });
        }
        if (videogame){
            return res.json(videogame);
        } else {
            return res.status(404).send("Videogame not found.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getDetailVideogame;