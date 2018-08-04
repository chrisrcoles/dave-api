require('dotenv').load()

const config = {
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	host: process.env.POSTGRES_HOST,
	dialect: "postgres",
  logging: console.log
};

module.exports = {
  "development": config,
  "staging": config,
  "test": config,
  "production": config
};

