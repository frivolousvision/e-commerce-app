const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "4321",
  host: "localhost",
  port: 5432,
  database: "e_commerce_db",
});

module.exports = pool;
