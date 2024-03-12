const { Pool } = require("pg");
require("dotenv").config();

const isDevelopment = process.env.ENVIRONMENT === "development";

const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: "solace_notes_db",
  ssl: !isDevelopment ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
