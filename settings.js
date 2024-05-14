if (!process.env.NODE_ENV) {
    require('dotenv').config();
    console.log('using dotenv');
  }

    module.exports = {
        mongoDB: {
            username: process.env.MONGODB_USERNAME,
            password: process.env.MONGODB_PASSWORD,
            url: process.env.MONGODB_URL,
            mainDB: process.env.MAIN_DB
        }
    };