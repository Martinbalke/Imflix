'use strict';

//NPM PACKAGE IMPORTS 
require('dotenv').config()
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const {Client} = require('pg');

//LOCAL IMPORTS
//Model for favorites
const favorites = require('./model/favorites');
//Function for searching through the open source netflix database supply a search criteria and a callback
const netflixSearch = require('./utils/uNoGS-netflix');
//Function for searching through the open source IMDB database supply a ID and a callback
const imdbSearch = require('./utils/tmdb');


//SQL Database configuration
const client = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE
});

client.connect()
client.on('error', (error) => console.error(error));

//Initialize the favorites table
client.query(favorites);

//Initialize express and have it listen on port 
const app = express();
const port = process.env.PORT || 3000;

//Setup express to use the express json parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup paths
const publicDirectory = path.join(__dirname + '/public');
const partials = path.join(__dirname + '/views/partials');
const views = path.join(__dirname + '/views');

//Declaring the static directory for express to serve
app.use(express.static(publicDirectory));

//Setting up Handlebars to be the view engine and then pointing towards the views and partials folders for utilization
app.set('view engine', 'hbs');
app.set('views', views);
hbs.registerPartials(partials);


app.get('/', (req, res) => {
	res.render('index');
});

app.get('/search', (req, res) => {
	res.render('search', {
		text: 'Search below to discover new shows'
	});
});


//Takes in the search form criteria and uses that to search the open source netflix db
app.post('/search', (req, res) => {
	const search = req.body.search;
	netflixSearch(search, (error, response) => {
		if (error) return error;
		res.render('search', {
			data: response.ITEMS,
			text: `Click on a title below to see it's IMDB rating`
		});

	});
});


app.post('/imdb', (req, res) => {
	const imdb = req.body.imdb;
	imdbSearch(imdb, (error, response) => {
		const { poster_path: image, title, vote_average: rating, overview: synopsis } = response[0];
		if (error) return error;
		res.render('imdb', {
			image,
			title,
			rating,
			synopsis,
			imdb
		});
	});
});

app.post('/favorites', (req, res) => {
	const imdbID = req.body.id;
	client.query('INSERT INTO favorites(imdbid) values($1)', [imdbID])
		.then( (result) =>  res.status(201).send())
		.catch ( (error) => res.status(400).send());

});


app.get('/favorites', (req, res) => {
	const query = {
		text: 'SELECT imdbid FROM favorites',
		rowMode: 'array',
	}
	const data = [];

	client.query(query)
		.then( (result) => {
			result.rows.forEach( (imdbID) => {
				imdbSearch(imdbID, (error, result) => {
					if (error) return error;
					data.push(result);
					console.log(data);
				});
			})
		})
		.catch( (error) => console.error(error.stack));
});
app.listen(port, () => {
	console.log(`App is live on ${port}`);
});