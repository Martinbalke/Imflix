const imdbSearch = require('../utils/tmdb');
const database = require('../model/database');

//Listens for the ajax requst from the imdb button, grabs the id off of the request body, and saves it as a favorite
//This request is handled via ajax in the public.js
exports.postInsertFavorites = (req, res) => {
	const imdbID = req.body.id;
	database.client.query('INSERT INTO favorites(imdbid) values($1)', [imdbID])
		.then((result) => res.status(201).send())
		.catch((error) => res.status(400).send());

}

//Pulls out all of the favorites from the database then runs them through the IMDB api. Once it has that data it renders them to the page.
exports.getReadFavorites = (req, res) => {
	
	//Query statement for node-pg
	const query = {
		text: 'SELECT imdbid FROM favorites',
		rowMode: 'array',
	}

	database.client.query(query)
		.then( (result) => result.rows)
		.then( (rows) => {
			//Promise all runs all of the functions before returning them as a promise. This allows me to use Map sycnhronously
			const imdbData = Promise.all(rows.map((row) => imdbSearch(row)))
			imdbData.then((data) => {
				//The data comes back as an array of arrays. In order for HBS to loop over it, it needs to be flattened.
				data = data.flat();
				res.render('favorites', {
					data
				})
			})
		})
		.catch((error) => console.error(error.stack));
}

//Searches the favorites table and selects imdbid's with like titles to the one that is being removed then deletes them. 
//This request is handled via ajax in the public.js
exports.deleteFavorite = (req, res) => {
	const id = req.body.id;
	const query = `DELETE FROM favorites WHERE imdbid LIKE $1`
	console.log(id);
	const values = [id]
	res.status(200).send();
	database.client.query(query, values)
		.then( (result) => { console.log('deleted count' + result.rowCount)})
		.catch( (error) => { console.error(error)});
}