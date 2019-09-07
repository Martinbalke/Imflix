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
		console.log(response.ITEMS);
		//Error handling for a blank response from the API
		if (response.ITEMS.length === 0) return res.render('search', {
			text: 'Search below to discover new shows',
			error: 'No search results returned, Please try a new search.'
		})  
		res.render('search', {
			data: response.ITEMS,
			text: `Click on a title below to see it's IMDB rating`
		});

	});
}