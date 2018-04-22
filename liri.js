
require("dotenv").config();

// Variables
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const fs = require('fs');
const keys = require('./keys');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const input = process.argv[2];
const input2 = process.argv[3];
const tweetCount = 20;


// Displays the last 10 tweets of the authorized user
const getTweets = function() {

    client.get('statuses/user_timeline', {count: `${tweetCount}`}, function(error, tweets, response) {
        if (!error) {
            tweets.forEach(info => {
                console.log(info.text);
                console.log(info.created_at);
            })
        } else {
            console.log('There was an error: ' + error);
        }
    });
}
// End of getTweets function

// Get song info by searching a song title input
const getSongInfo = function(songName) {
     
    spotify.search({ type: 'track', query: `${input2}` }, function(error, data) {
      if (!error) {
        console.log('Artist(s) name: ' + data.tracks.items[0].artists[0].name);
        console.log('Song name: ' + data.tracks.items[0].name);
        console.log('Preview link: ' + data.tracks.items[0].external_urls.spotify);
        console.log('Album: ' + data.tracks.items[0].album.name);
      } else {
        return console.log('Error occurred: ' + err);
      }
    });
}
// End of getSongInfo function


const getMovieInfo = function(movieName) {

}
// End of getMovieInfo function


const followCommands = function(commands) {

}
// End of followCommands function



switch (input) {
    case `my-tweets`:
        getTweets();
        break;
    case `spotify-this-song`:
        getSongInfo(input2);
        break;
    case `movie-this`:
        getMovieInfo(input2);
        break;
    case `do-what-it-says`:
        followCommands(inputCommands);
        break;
    default:
        console.log('Sorry, ' + input + ' is not a permitted action.');
        break;
}
