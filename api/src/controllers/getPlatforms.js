const axios = require("axios");
const { Platform } = require('../db.js');

const getPlatforms = async (req, res) => {
    try {
        let allPlatforms = await Platform.findAll();
        res.json(allPlatforms);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getPlatforms;