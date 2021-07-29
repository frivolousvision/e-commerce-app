require("dotenv").config();
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";
const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATA}`;
const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isProduction ? proConfig : devConfig,
  //ssl: {
  //  rejectUnauthorized: false,
  //},
});

module.exports = pool;
