require("dotenv").config();
const keys = require('./keys');

let input = process.argv[2];
let input2 = process.argv[3];

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);


switch (input) {
    case `my-tweets`:
        getTweets()
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
        console.log('Sorry, ' + expr + ' is not a permitted action.');
        break;
}



const getTweets = function() {

}

const getSongInfo = function(songName) {

}

const getMovieInfo = function(movieName) {

}

const followCommands = function() {
    
}