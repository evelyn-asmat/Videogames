require('dotenv').config();
const { Videogame } = require('../db.js');

const saveVideogame = async (req, res) => {
    try {
        const { name, description, platforms, released, rating, genres } = req.body;
        const imageDataBase64 = req.body.image;

        if (!name || !description || !platforms || !imageDataBase64 || !released || !rating){
            return res.status(400).send("Incompleted fields.");
        }
        
        const base64Parts = imageDataBase64.split(',');

        console.log('Tipo de datos:', base64Parts[0]);
        console.log('Datos:', base64Parts[1]);

        if (base64Parts.length !== 2) {
            console.error('Invalid Base64 format:', imageDataBase64);
            return res.status(400).send("Invalid Base64 format.");
        }

        const videogame = await Videogame.create({
            name,
            description,
            platforms,
            image: imageDataBase64,
            released,
            rating
        });

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