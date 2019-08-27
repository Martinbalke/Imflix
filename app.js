//NPM PACKAGE IMPORTS 
const express = require('express');
const path = require('path');
const hbs = require('hbs');

//LOCAL IMPORTS
//Function for searching through the open source netflix database supply a search criteria and a callback
const netflixSearch = require('./utils/uNoGS-netflix');
//Function for searching through the open source IMDB database supply a ID and a callback
const imdbSearch = require('./utils/tmdb');

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
	res.render('search');
});


//Takes in the search form criteria and uses that to search the open source netflix db
app.post('/search', (req, res) => {
	const search = req.body.search;

	netflixSearch(search, (error, response) => {
		if (error) return error;

		const imdbid = response.ITEMS[0].imdbid.toString();
		console.log(imdbid);
	});
})


app.listen(port, () => {
	console.log(`App is live on ${port}`);
});