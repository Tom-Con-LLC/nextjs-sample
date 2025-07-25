const dotenv = require("dotenv");

dotenv.config("./.env");

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      port: 5432,
    },
  },
};
