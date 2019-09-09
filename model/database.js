//Setup the database with .env variables 

require('dotenv').config()
const { Client } = require('pg');

//SQL Database configuration
exports.client = new Client({
	connectionString: process.env.DATABASE_URL
});