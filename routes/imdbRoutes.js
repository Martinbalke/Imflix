const imdbSearch = require('../utils/tmdb');


exports.getImdb = (req, res) => {
	const imdb = req.query.imdb;
	imdbSearch(imdb)
		.then((result) => {
			//Destructuring the result to use on the relavant variables
			let { name, poster_path: image, vote_average: rating, overview: synopsis } = result[0];
			//Movie results have a .title property and shows have a .name the if statement below normalizes the data
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