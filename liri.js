
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
let movieSearch;
let rottenScore;

// Displays the last 10 tweets of the authorized user
const getTweets = function() {

    client.get('statuses/user_timeline', {count: `${tweetCount}`}, function(err, tweets, response) {
        if (!err) {
            tweets.forEach(info => {
                console.log(`\n\nTweet: ${info.text} \nDate Posted: ${info.created_at}`);
                fs.appendFile('log.txt', `\n\nTweet: ${info.text} \nDate Posted: ${info.created_at}`, (err) => {
                    if (err) throw err;
                    console.log('\nThe data was appended to log.txt file!');
                });
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
            console.log(`\n\nArtist(s) name: ${data.tracks.items[0].artists[0].name} \nSong name: ${data.tracks.items[0].name} \nPreview link: ${data.tracks.items[0].external_urls.spotify} \nAlbum: ${data.tracks.items[0].album.name}`);
            fs.appendFile('log.txt', `\n\nArtist(s) name: ${data.tracks.items[0].artists[0].name} \nSong name: ${data.tracks.items[0].name} \nPreview link: ${data.tracks.items[0].external_urls.spotify} \nAlbum: ${data.tracks.items[0].album.name}`, (err) => {
                if (err) throw err;
                console.log('\nThe data was appended to log.txt file!');
            });
        } else {
            return console.log('Error occurred: ' + err);
        }
    });
}
// End of getSongInfo function

// Displays movie info by searching a movie title
const getMovieInfo = function(movieName) {
    
    if (movieName) {
        movieSearch = movieName;
    } else {
        movieSearch = 'Mr Nobody';
    }
    request('http://www.omdbapi.com/?t=' + movieSearch + '&apikey=' + omdbAPIKey, function (err, response, body) {
        if (!err) {
            let movieInfo = JSON.parse(body);
            movieInfo.Ratings.forEach(function(sources) {
                if (sources.Source === "Rotten Tomatoes") {
                    rottenScore = sources.Value;
                } 
            })
            console.log(`\n\nTitle: ${movieInfo.Title} \nYear: ${movieInfo.Year} \nIMDB Rating: ${movieInfo.imdbRating} \nRotten Tomatoes: ${rottenScore} \nCountry produced in: ${movieInfo.Country} \nLanguage: ${movieInfo.Language} \nPlot: ${movieInfo.Plot} \nActors: ${movieInfo.Actors}`);
            fs.appendFile('log.txt', `\n\nTitle: ${movieInfo.Title} \nYear: ${movieInfo.Year} \nIMDB Rating: ${movieInfo.imdbRating} \nRotten Tomatoes: ${rottenScore} \nCountry produced in: ${movieInfo.Country} \nLanguage: ${movieInfo.Language} \nPlot: ${movieInfo.Plot} \nActors: ${movieInfo.Actors}`, (err) => {
                if (err) throw err;
                console.log('\nThe data was appended to log.txt file!');
            });
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


