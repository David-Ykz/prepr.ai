require('dotenv').config();
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "rxfkmddz",
    host: "mahmud.db.elephantsql.com",
    database: "rxfkmddz",
    password: process.env.SQL_PASSWORD,
    port: 5432
});

module.exports = {
    pool
};