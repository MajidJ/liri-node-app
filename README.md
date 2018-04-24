# Liri Node App

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back information data from Spotify, Twitter and OMDB.

## Getting Started

1. Clone the GitHub project repo to your computer 
2. Navigate to the project's root directory in the bash terminal and enter 'npm install' to download all the necessary node modules listed in the package.json
3. Liri utalizes Spotify, Twitter and OMDB API keys. You will need to register as a developer to obtain your own IDs/Tokens/Keys for each API. Once registerd, you will need to create a '.env' file in the root directory of the project that contains your respective identifier information in this format:
    1. SPOTIFY_ID= put-your-id-here
    2. SPOTIFY_SECRET= put-your-secret-id-here
    3. TWITTER_CONSUMER_KEY= put-your-key-here
    4. TWITTER_CONSUMER_SECRET= put-your-secret-key-here
    5. TWITTER_ACCESS_TOKEN_KEY= put-your-token-key-here
    6. TWITTER_ACCESS_TOKEN_SECRET= put-your-token-secret-here
    7. OMDB_CONSUMER_KEY= put-your-consumer-key-here

## Running the app

The app is run by passing 1 of 4 differnt commands in the terminal.
1. 'node liri.js my-tweets' returns the last 20 tweets on your account with their respective timestamps
2. 'node liri.js spotify-this-song [insert-song-name]' returns the artist, song, album and a preview link for your searched item
3. 'node liri.js movie-this [insert-movie-name]' returns the movie title, year, IMDB rating, Rotten Tomatoes Rating, country, language, plot and actors information
4. 'node liri.js do-what-it-says' executes the commands that have been provided in the random.txt file in the project's root directory

Note:
* All returned information is console logged and is appended to the log.txt file in the project's root directory.
* If no song name or movie name is provided during execution of liri.js, the default item searched is the song The Sign by Ace of Base and the movie Mr. Nobody, respectively.

## Authors

* **Majid Jamaleldine** - [Taxlife](https://github.com/taxlife)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details