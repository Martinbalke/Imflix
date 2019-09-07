'use strict';

//NPM PACKAGE IMPORTS
const express = require('express');
const path = require('path');
const hbs = require('hbs');


//LOCAL IMPORTS
//Model for favorites
const favorites = require('./model/favorites');
//Function for searching through the open source IMDB database supply a ID and a callback
const database = require('./model/database');

//DATABASE
//Connect to the database
database.client.connect()
database.client.on('error', (error) => console.error(error));
//Initialize the favorites Model
database.client.query(favorites);

//ROUTES
const netflixRoutes = require('./routes/netflixRoutes');
const imdbRoutes = require('./routes/imdbRoutes');
const favoritesController = require('./controller/favoritesController');


//Initialize express and have it listen on port 
const app = express();
const port = process.env.PORT || 3000;

//Setup express to parse JSON and URL encoded data
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
app.get('/search', netflixRoutes.getSearch);
app.post('/search', netflixRoutes.postSearch);
// app.get('/search:search', )
app.post('/imdb', imdbRoutes.postImdb);
app.post('/favorites', favoritesController.postInsertFavorites);
app.get('/favorites', favoritesController.getReadFavorites);
app.delete('/favorites', favoritesController.deleteFavorite);

app.listen(port, () => {
	console.log(`App is live on ${port}`);
});