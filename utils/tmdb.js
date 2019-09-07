
const fetch = require('node-fetch');

const tmdbGet = (imdbid) => {
	const url = `https://api.themoviedb.org/3/find/${imdbid}?api_key=0e932f82321ea8e70319b6b15dc59e01&language=en-US&external_source=imdb_id`;
	return fetch(url)
		.then( (response) => response.json())
		.then( (jsonData) => {
			if (jsonData.tv_results.length !== 0) return jsonData.tv_results;
			if (jsonData.movie_results.length !== 0) return jsonData.movie_results;
		})
		.catch( (error) => error);
}

// Sample call with object destructuring
// tmdbGet('tt2189248')
// 	.then( (result) => {
// 		let { name, poster_path: img, vote_average: rating} = result[0];
// 		if (!name) name = result[0].title;
// 		console.log(name, img, rating);

// 	})
// 	.catch( (error) => console.log(error));




module.exports = tmdbGet;