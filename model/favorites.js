//Create the table for favorites model if none exists already

const createFavorites = `CREATE TABLE IF NOT EXISTS 
	favorites(imdbID VARCHAR(255) NOT NULL PRIMARY KEY );`


module.exports = createFavorites;


