require('dotenv').config();
const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    // password: 'password',
    port: process.env.DB_PORT
})

module.exports = pool;