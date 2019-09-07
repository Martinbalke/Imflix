const netflixSearch = require('../utils/uNoGS-netflix');

exports.getSearch = (req, res) => {
	res.render('search', {
		text: 'Search below to discover new shows'
	});
}


exports.postSearch = (req, res) => {
	const search = req.body.search;
	netflixSearch(search, (error, response) => {
		if (error) return error;
		res.render('search', {
			data: response.ITEMS,
			text: `Click on a title below to see it's IMDB rating`
		});

	});
}