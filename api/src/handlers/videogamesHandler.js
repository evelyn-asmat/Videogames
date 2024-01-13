require('dotenv').config();

const { saveVideogame, getDetailAPI, getDetailDB, getVideogamesDB, getVideogamesAPI, getVideogamesAll, sortVideogamesByName, sortVideogamesByRating } = require('../controllers/videogamesController.js');

const getVideogamesHandler = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const { name, order, genre, origin } = req.query;

    try {
        let videogamesResponse;

        if (origin === "DB") {
            videogamesResponse = await getVideogamesDB(name);
        } else if (origin === "API") {
            videogamesResponse = await getVideogamesAPI(name);
        } else {
            videogamesResponse = await getVideogamesAll(name);
        }

        if (order && order !== "") {
            const [field, sortingOrder] = order.split("-");

            if (field === "name") {
                await sortVideogamesByName(videogamesResponse, sortingOrder);
            } else if (field === "rating") {
                await sortVideogamesByRating(videogamesResponse, sortingOrder);
            }
        }

        const startIndex = (page - 1) * limit;
        if (name) {
            res.header('total-videogames', videogamesResponse.length > 15 ? limit : videogamesResponse.length);
            return res.json(videogamesResponse.slice(0, limit));
        } else {
            res.header('total-videogames', videogamesResponse.length);
            return res.json(videogamesResponse.slice(startIndex, startIndex + limit));
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getDetailVideogameHandler = async (req, res) => {
    const { idVideogame } = req.params;
    if (!idVideogame) {
        return res.status(400).send({ error: "ID required" });
    }
    try {
        let response;
        if (Number.isInteger(Number(idVideogame))) {
            // Get detail from API
            response = await getDetailAPI();
        } else {
            // Get detail from DB
            response = await getDetailDB();
        }
        if (response) {
            return res.json(response);
        } else {
            return res.status(404).send({ error: "Videogame not found." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const saveVideogameHandler = async (req, res) => {
    try {
        const { name, description, image, platforms, released, rating, genres } = req.body;

        if (!name || !description || !platforms || !image || !released || !rating) {
            return res.status(400).send({ error: "Incompleted fields." });
        }

        const base64Parts = image.split(',');
        if (base64Parts.length !== 2) {
            return res.status(400).send({ error: "Invalid Base64 format." });
        }

        const response = await saveVideogame(name, description, image, platforms, released, rating, genres);

        res.json(response);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getDetailVideogameHandler,
    getVideogamesHandler,
    saveVideogameHandler
}