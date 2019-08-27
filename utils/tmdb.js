// TMDB img link https://image.tmdb.org/t/p/w500/
const request = require('request');

const tmdbGet = (imdbid, callback) => {
	const url = `https://api.themoviedb.org/3/find/${imdbid}?api_key=0e932f82321ea8e70319b6b15dc59e01&language=en-US&external_source=imdb_id`;

	request({ url, json: true }, (error, { body }) => {
		if (error) return callback(console.log(error), undefined);

		//Checking to see if the response.body contains either a movie or a tv show as the result and then sending over only that data
		if (body.movie_results.length !== 0) return callback(undefined, body.movie_results);
		if (body.tv_results.length !== 0) return callback(undefined, body.tv_results);


	})

}

//Sample call with object destructuring

// tmdbGet('tt2189248', (error, response) => {
// 	if (error) return console.log(error);
// 	const { name, poster_path: img, vote_average: rating} = response[0];
// 	console.log(name, img, rating);
// })

module.exports = tmdbGet;