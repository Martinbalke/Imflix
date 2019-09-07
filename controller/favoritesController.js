const imdbSearch = require('../utils/tmdb');
const database = require('../model/database');

exports.postInsertFavorites = (req, res) => {
	const imdbID = req.body.id;
	database.client.query('INSERT INTO favorites(imdbid) values($1)', [imdbID])
		.then((result) => res.status(201).send())
		.catch((error) => res.status(400).send());

}

exports.getReadFavorites = (req, res) => {
	const query = {
		text: 'SELECT imdbid FROM favorites',
		rowMode: 'array',
	}

	database.client.query(query)
		.then((result) => result.rows)
		.then((rows) => {
			const imdbData = Promise.all(rows.map((row) => imdbSearch(row)))
			imdbData.then((data) => {
				data = data.flat();
				res.render('favorites', {
					data
				})
			})
		})
		.catch((error) => console.error(error.stack));
}