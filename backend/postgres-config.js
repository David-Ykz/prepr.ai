const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "db",
    password: "123456789",
    port: 5432
});

module.exports = {
    pool
};