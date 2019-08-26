
const unirest = require("unirest");

const netflixSearch = (searchQuery) => {

	unirest("GET", "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi")
		.query({
			//get is the search paramater
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
		}).end(function (res) {
			if (res.error) throw new Error(res.error);

			console.log(res.body);
		});

}

module.exports = netflixSearch;
