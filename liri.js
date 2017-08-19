// Load Required files
var request = require('request');
var keys = require('./keys.js');
var dateFormat = require('dateformat');
var task = process.argv[2];
var client = keys.twitterKeys;
var spot = keys.spotifyKeys;

// Twitter
// node liri.js my-tweets
if ( task === 'my-tweets') {
  client.get('statuses/user_timeline.json', { screen_name: 'mariomelchor', count: 20 }, function(error, tweets, response) {
    if(error) throw error;

    console.log( '******************************************************************************************************************' );
    console.log( '******************************************        Twitter         ************************************************' );
    console.log( '' );

    // Loop through tweets
    for (var i = 0; i < tweets.length; i++) {
      console.log( ' Posted by : ' + tweets[i].user.name + ' | @' + tweets[i].user.screen_name );
      console.log( '' );
      console.log( ' ' + tweets[i].text );
      console.log( ' - Posted on: ' + dateFormat( tweets[i].created_at, 'mmmm dS, yyyy') + ' | Location : ' + tweets[i].user.location  );
      console.log( '' );
      console.log( '-----------------------------------------------------------------------------------------------------------------' );
      console.log( '' );
    }

  });
}

// Movie This
// node liri.js movie-this '<movie name here>'
if ( task === 'movie-this') {
  var omdbapikey = process.env.OMDB_API_KEY;
  var omdbapi = 'http://www.omdbapi.com/?apikey=' + omdbapikey;

  var movieTitle = process.argv[3] || 'Mr. Nobody';
  var requestUrl = omdbapi + '&type=movie&plot=short&t=' + movieTitle;

  request(requestUrl, function (error, response, body) {
    var movie = JSON.parse(body);

    // If there is an error show message
    if ( error ) {
      return console.log( 'Sorry Please Try Searching Again there was an Error.' );
    }

    // If there is a Movie show movie data
    if ( movie.Response === 'True' ) {

      console.log( '******************************************************************************************************************' );
      console.log( '******************************************       MOVIE THIS       ************************************************' );
      console.log( '' );

      // If no movie is passed show this movie
      if ( movie.Title === 'Mr. Nobody' ) {
        console.log( "If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/ It's on Netflix!" );
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

    } else {
      console.log( 'Movie Not Found!' );
    }

  });
}

// Spotify This Song
// node liri.js spotify-this-song '<song name here>'
if ( task === 'spotify-this-song') {
  var songTitle = process.argv[3] || 'track:The+Sign+artist:Ace+of+Base';

  spot.search({ type: 'track', query: songTitle }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // console.log(data);
    var tracks = data.tracks.items[0];

    console.log( '' );
    console.log( '******************************************************************************************************************' );
    console.log( '******************************************       Spotify       ************************************************' );
    console.log( '' );

    console.log( 'SONG INFORMATION' );
    console.log( 'Song Title: ' + tracks.name);
    console.log( 'Artist: ' + tracks.album.artists[0].name );
    console.log( 'Preview Link: ' + tracks.artists[0].external_urls.spotify );
    console.log( 'Album: ' + tracks.album.name );
    console.log( '' );
    console.log( '******************************************************************************************************************' );

  });

}