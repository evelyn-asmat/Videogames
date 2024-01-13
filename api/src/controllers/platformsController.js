const { Platform } = require('../db.js');

const getPlatforms = async () => {
    return await Platform.findAll();
}

const saveIfNoPlatforms = async (videogamesAPI) => {
    Platform.count()
        .then((count) => {
            if (count === 0) {
                const platforms = new Set(videogamesAPI.flatMap(game => game.platforms));
                const allPlatforms = [...platforms].map(platformName => ({ name: platformName }));
                return Platform.bulkCreate(allPlatforms.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())));
            }
        });
}

module.exports = {
    getPlatforms,
    saveIfNoPlatforms
}