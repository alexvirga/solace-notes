const { Pool } = require("pg");
require("dotenv").config();

const isDevelopment = process.env.ENVIRONMENT === "development";

// Uncomment for local db

// const pool = new Pool({
//   user: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.PORT,
//   database: "solace_notes_db",
//   ssl: !isDevelopment ? { rejectUnauthorized: false } : false,
// });

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
