
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
const tweetCount = 10;

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

const getSongInfo = function(songName) {

}

const getMovieInfo = function(movieName) {

}

const followCommands = function(commands) {

}


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
