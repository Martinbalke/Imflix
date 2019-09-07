//Tmdb open source imdb database

const fetch = require('node-fetch');

const tmdbGet = (imdbid) => {
	const url = `https://api.themoviedb.org/3/find/${imdbid}?api_key=0e932f82321ea8e70319b6b15dc59e01&language=en-US&external_source=imdb_id`;
	return fetch(url)
		.then( (response) => response.json())
		.then( (jsonData) => {
			//Checking the object to see if the result is a movie or a tv, then normalizing the data to make it easier to display
			if (jsonData.tv_results.length !== 0) {
				//Adding on the Imdbid to the result so that I can use it to delete items
				jsonData.tv_results[0].imdbid = imdbid;
				return jsonData.tv_results;
			};
			if (jsonData.movie_results.length !== 0) {
				jsonData.movie_results[0].imdbid = imdbid;
				return jsonData.movie_results;
			}
		})
		.catch( (error) => error);
}

// Sample call with object destructuring
// tmdbGet('tt2189248')
// 	.then( (result) => {
// 		console.log(result);
// 		let { name, poster_path: img, vote_average: rating} = result[0];
// 		if (!name) name = result[0].title;
// 		// console.log(name, img, rating);

// 	})
// 	.catch( (error) => console.log(error));




module.exports = tmdbGet;