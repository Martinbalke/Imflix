//Setup the database with .env variables 

require('dotenv').config()
const { Client } = require('pg');

//SQL Database configuration
exports.client = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE
});