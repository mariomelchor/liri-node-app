// Load Required files
var twitter = require('./keys.js');
var omdb = require('./node_modules/omdb');

var task = process.argv[2];

omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
    if(err) {
        return console.error(err);
    }

    if(!movie) {
        return console.log('Movie not found!');
    }

    console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
    console.log(movie.plot);

    // Saw (2004) 7.6/10
    // Two men wake up at opposite sides of a dirty, disused bathroom, chained
    // by their ankles to pipes. Between them lies...
});

// Movie This
// node liri.js movie-this '<movie name here>'
if ( task === 'movie-this') {
	// var omdbapikey = '40e9cece';
	// var omdbapi = 'http://www.omdbapi.com/?apikey=' + omdbapikey;

	// var movieTitle = process.argv[3];
	// var requestUrl = omdbapi + '&t=' + movieTitle;

	// console.log( omdbapi );
	// console.log( requestUrl );



	omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
	    if(err) {
	        return console.error(err);
	    }

	    if(!movie) {
	        return console.log('Movie not found!');
	    }

	    console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
	    console.log(movie.plot);

	    // Saw (2004) 7.6/10
	    // Two men wake up at opposite sides of a dirty, disused bathroom, chained
	    // by their ankles to pipes. Between them lies...
	});

}