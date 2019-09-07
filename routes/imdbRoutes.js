const imdbSearch = require('../utils/tmdb');

exports.postImdb = (req, res) => {
	const imdb = req.body.imdb;
	imdbSearch(imdb)
		.then((result) => {
			let { name, poster_path: image, vote_average: rating, overview: synopsis } = result[0];
			if (!name) name = result[0].title;
			res.render('imdb', {
				image,
				name,
				rating,
				synopsis,
				imdb
			});
		})
		.catch((error) => console.error(error))
}