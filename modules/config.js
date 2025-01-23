// modules/config.js
require('dotenv').config();

const config = {
    appName: "INTREPID",
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGODB_URI
};

module.exports = config;
