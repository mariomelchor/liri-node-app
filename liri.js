// Load Required files
var twitter = require('./keys.js');

var task = process.argv[2];

// Movie This
// node liri.js movie-this '<movie name here>'
if ( task === 'movie-this') {
	var omdbapikey = '40e9cece';
	var omdbapi = 'http://www.omdbapi.com/?apikey=' + omdbapikey;

	var movieTitle = process.argv[3];
	var requestUrl = omdbapi + '&t=' + movieTitle;

	console.log( omdbapi );
	console.log( requestUrl );
}