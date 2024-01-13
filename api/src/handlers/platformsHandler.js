const { getPlatforms } = require('../controllers/platformsController.js');

const getPlatformsHandler = async (req, res) => {
    try {
        let response = await getPlatforms();
        res.json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = getPlatformsHandler;