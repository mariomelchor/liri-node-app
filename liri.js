// Load Required files
var twitter = require('./keys.js');
var request = require('request');

var task = process.argv[2];

// Movie This
// node liri.js movie-this '<movie name here>'
if ( task === 'movie-this') {
  var omdbapikey = '40e9cece';
  var omdbapi = 'http://www.omdbapi.com/?apikey=' + omdbapikey;

  var movieTitle = process.argv[3] || 'Mr. Nobody';
  var requestUrl = omdbapi + '&type=movie&plot=short&t=' + movieTitle;

  request(requestUrl, function (error, response, body) {

    if (error) {
      return console.log( 'Sorry Please Try Searching Again there was an Error.' );
    }

    var movie = JSON.parse(body);

    console.log( '******************************************************************************************************************' );
    console.log( '******************************************       MOVIE THIS       ************************************************' );
    console.log( '' );

    if ( movie.Title === 'Mr. Nobody' ) {
      console.log( 'If you havent watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/ Its on Netflix!');
      console.log( '' );
    }

    console.log( 'MOVIE INFORMATION' );
    console.log( 'Movie Title: ' + movie.Title );
    console.log( 'Year Released: ' + movie.Year );
    console.log( 'Country: ' + movie.Country );
    console.log( 'Language: ' + movie.Language );
    console.log( '' );
    console.log( 'RATINGS' );
    console.log( movie.Ratings[0].Source + ': ' + movie.Ratings[0].Value );
    console.log( movie.Ratings[1].Source + ': ' + movie.Ratings[1].Value );
    console.log( '' );
    console.log( 'PLOT/ACTORS' );
    console.log( 'Plot: ' + movie.Plot );
    console.log( 'Actors: ' + movie.Actors );
    console.log( '' );
    console.log( '******************************************************************************************************************' );

  });
}