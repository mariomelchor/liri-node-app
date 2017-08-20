// Load Required files
var request = require('request');
var keys = require('./keys.js');
var dateFormat = require('dateformat');
var fs = require('fs');
var task = process.argv[2];
var client = keys.twitterKeys;
var spot = keys.spotifyKeys;

// Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the parameters
var searchValue = '';

// loop through parameters and concat
for (var i = 3; i < nodeArgs.length; i++) {
  searchValue += nodeArgs[i] + '+';
}

// The switch-case will direct which function gets run.
switch (task) {
  case 'my-tweets':
    myTweets();
    break;

  case 'movie-this':
    var movieTitle = searchValue || 'Mr.+Nobody';
    movieThis(movieTitle);
    break;

  case 'spotify-this-song':
    var songTitle = searchValue || 'track:The+Sign+artist:Ace+of+Base';
    searchSpotify(songTitle);
    break;

  case 'do-what-it-says':
    doWhatItSays();
    break;
}

// Twitter
// node liri.js my-tweets
function myTweets() {
  client.get('statuses/user_timeline.json', { screen_name: 'mariomelchor', count: 20 }, function(error, tweets, response) {
    if(error) throw error;

    // Empty variable used to append tweet to log.txt
    var toFile = '';

    console.log( '' );
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

      // Apped data to toFile variable
      toFile += 'Posted by : ' + tweets[i].user.name + ' | @' + tweets[i].user.screen_name + tweets[i].text;
      toFile += ' - Posted on: ' + dateFormat( tweets[i].created_at, 'mmmm dS, yyyy') + ' | Location : ' + tweets[i].user.location;
      toFile += '\n' + '******************************************************************************************************************' + '\n';
    }

    // Log all data to log.txt
    log( toFile );

  });
}

// Movie This
// node liri.js movie-this '<movie name here>'
function movieThis(movieTitle) {
  var omdbapikey = process.env.OMDB_API_KEY;
  var omdbapi = 'http://www.omdbapi.com/?apikey=' + omdbapikey;

  var requestUrl = omdbapi + '&type=movie&plot=short&t=' + movieTitle;

  request(requestUrl, function (error, response, body) {
    var movie = JSON.parse(body);

    // If there is an error show message
    if ( error ) {
      return console.log( 'Sorry Please Try Searching Again there was an Error.' );
    }

    // If there is a Movie show movie data
    if ( movie.Response === 'True' ) {

      console.log( '' );
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

      // Log all data to log.txt
      let toFile =
      'Movie Title: ' + movie.Title +
      ' Year Released: ' + movie.Year +
      ' Country: ' + movie.Country +
      ' Language: ' + movie.Language +
      ' Ratings: ' + movie.Ratings[0].Source + ': ' + movie.Ratings[0].Value +  movie.Ratings[1].Source + ': ' + movie.Ratings[1].Value +
      ' Plot: ' + movie.Plot +
      ' Actors: ' + movie.Actors +
      '\n' + '******************************************************************************************************************' + '\n';
      log( toFile );

    } else {
      console.log( 'Movie Not Found!' );
    }

  });
}

// Do What It Says
//node liri.js do-what-it-says
function doWhatItSays() {

  fs.readFile('random.txt', 'utf8', function(error, data) {

    // If there is an error show message
    if (error) {
      return console.log(error);
    }

    // Split items in text file by comma place in array
    var textArray = data.split(',');

    if ( textArray[0] === 'spotify-this-song' ) {
      // Run searchSpotify function
      searchSpotify(textArray[1]);
    }

  });
}

// Spotify This Song
// node liri.js spotify-this-song '<song name here>'
function searchSpotify(songTitle) {
  spot.search({ type: 'track', query: songTitle }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // console.log(data);
    var tracks = data.tracks.items[0];

    console.log( '' );
    console.log( '******************************************************************************************************************' );
    console.log( '*******************************************       Spotify       **************************************************' );
    console.log( '' );

    console.log( 'SONG INFORMATION' );
    console.log( 'Song Title: ' + tracks.name);
    console.log( 'Artist: ' + tracks.album.artists[0].name );
    console.log( 'Preview Link: ' + tracks.artists[0].external_urls.spotify );
    console.log( 'Album: ' + tracks.album.name );
    console.log( '' );
    console.log( '******************************************************************************************************************' );

    // Log all data to log.txt
    let toFile =
     'Song Title: ' + tracks.name +
     ' Artist: ' + tracks.album.artists[0].name +
     ' Preview Link: ' + tracks.artists[0].external_urls.spotify +
     ' Album: ' + tracks.album.name +
     '\n' + '******************************************************************************************************************' + '\n';
   log( toFile );

  });
}

// Log searches to log.txt
function log(data){
  fs.appendFile('log.txt', data, function(err) {
    if (err) throw err;
    console.log('This data was appended to log.txt');
  });
}