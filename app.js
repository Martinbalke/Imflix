//NPM package dependencies 
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const unirest = require('unirest');

//Local imports
const netflixSearch = require('./controller/unog-netflix');

//Initialize express and have it listen on port 
const app = express();
const port = process.env.PORT || 3000;

//Setup express to use the express json parser
app.use(express.json());

//Setup paths
const publicDirectory = path.join(__dirname + '/public');
const partials = path.join(__dirname + '/views/partials');
const views = path.join(__dirname + '/views');

app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', views);
hbs.registerPartials(partials);


app.get('/', (req, res) => {
	res.render('index');
});


app.listen(port, () => {
	console.log(`App is live on ${port}`);
});