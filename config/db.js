require('dotenv').config();
const env = process.env;
const db = {
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE || 'dev_test114',
    port: env.DB_PORT || 3306,
};

module.exports = db;
