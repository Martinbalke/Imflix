
const unirest = require("unirest");

const netflixSearch = (searchQuery, callback) => {

	unirest("GET", "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi")
		.query({
			"q": `"get:${searchQuery}-!1900,2019-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}"`,
			"t": "ns",
			"cl": "all",
			"st": "adv",
			"ob": "Relevance",
			"p": "1",
			"sa": "and"
		}).headers({
			"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
			"x-rapidapi-key": "bc8d2c1c4emsh14316197c74c115p1db4aajsn5d33151046d6"
		}).end((res) => {
			if (res.error) return callback(res.error, undefined);



			//Turns the data in to a string so I can use the string.replace method to remove the charcodes
			const data = JSON.stringify(res.body).replace(/&#39;/gi, `'`);
			body = JSON.parse(data);

			callback(undefined, body);
		});

}

module.exports = netflixSearch;
