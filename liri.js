
require("dotenv").config();

// Variables
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');
const keys = require('./keys');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const omdbAPIKey = keys.omdb.id;
let input = process.argv[2];
let input2 = process.argv[3];
const tweetCount = 20;
let songSearch;

// Displays the last 10 tweets of the authorized user
const getTweets = function() {

    client.get('statuses/user_timeline', {count: `${tweetCount}`}, function(err, tweets, response) {
        if (!err) {
            tweets.forEach(info => {
                console.log('Tweet: ' + info.text);
                console.log('Date posted: ' + info.created_at);
            })
        } else {
            console.log('Error occurred: ' + err);
        }
    });
}
// End of getTweets function

// Displays song info by searching a song title input
const getSongInfo = function(songName) {

    if (songName) {
        songSearch = songName;
    } else {
        songSearch = 'The Sign Ace of Base';
    }
    spotify.search({ type: 'track', query: `${songSearch}` }, function(err, data) {
        if (!err) {
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

// Displays movie info by searching a movie title
const getMovieInfo = function(movieName) {
    
    request('http://www.omdbapi.com/?t=' + movieName + '&apikey=' + omdbAPIKey, function (err, response, body) {
        if (!err) {
            let movieInfo = JSON.parse(body);
            console.log('Title: ', movieInfo.Title);
            console.log('Year: ', movieInfo.Year);
            console.log('IMDB Rating: ', movieInfo.imdbRating);
            movieInfo.Ratings.forEach(function(sources) {
                if (sources.Source === "Rotten Tomatoes") {
                    console.log('Rotten Tomatoes Rating: ', sources.Value);
                } 
            })
            console.log('Country produced in: ', movieInfo.Country);
            console.log('Language: ', movieInfo.Language);
            console.log('Plot: ', movieInfo.Plot);
            console.log('Actors: ', movieInfo.Actors);
        } else {
            return console.log('Error occurred: ' + err);
        }
    });
}
// End of getMovieInfo function

const followCommands = function(commands) {
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (!err) {
            input = data;
            let inputArray = data.split(',');
            input = inputArray[0];
            input2 = inputArray[1];
            liri();
        } else {
            return console.log('Error occurred: ' + err);
        }
    })
}
// End of followCommands function


// Switch statement to determine action based on passed console input parameters
const liri = function() {
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
            followCommands();
            break;
        default:
            console.log('Sorry, ' + input + ' is not a permitted action.');
            break;
    }
}

// Envoking the main functionality of the app 
liri();


