const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const initDb = (callback) => {
    if (mongoose.connection.readyState === 1) {
        console.log('Db is already initialized!');
        return callback(null);
    }
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log(`Connected to database: ${mongoose.connection.name}`);
            callback(null);
        })
        .catch((err) => callback(err));
};

module.exports = { initDb };