const mySql = require('mysql2');
const config = require('config');

 const connection = mySql.createConnection({
    host: config.get('DB_HOST'),
    user: config.get('DB_USER'),
    database: config.get('DB_NAME'),
    password: config.get('DB_PASSWORD')
}).promise();

module.exports = connection;
