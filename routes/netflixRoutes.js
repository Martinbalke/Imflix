const netflixSearch = require('../utils/uNoGS-netflix');


exports.getSearch = (req, res) => {
	const search = req.query.search;
	if (!search) return res.status(200).render('search', {
		text: 'Search below to discover new shows'
	})
	netflixSearch(search, (error, response) => {
		if (error) return error;
		//Error handling for a blank response from the API
		if (response.ITEMS.length === 0) return res.status(200).render('search', {
			text: 'Search below to discover new shows',
			error: 'No search results returned, Please try a new search.'
		})  
		res.status(200).render('search', {
			data: response.ITEMS,
			text: `Click on a title below to see it's IMDB rating`
		});

	});
}