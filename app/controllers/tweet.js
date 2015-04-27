var _       = require('underscore')
var moment  = require('moment');
var Twitter = require('twitter');

var twitter = new Twitter(DV.config.development.twitter);

exports.getSearch = function(req, res) {
    console.log('Twitter search requested');

    var params = {
        q: req.params.hash,
        // 4 mile radius around downtown Boston.
        geocode: "42.351252,-71.073808,5mi",
        count: 100,
        lang: "en",
    };

    // Make a get request to twitter for searches on tweets.
    twitter.get('search/tweets', params, function(error, tweets, response){
        // console.log(tweets)

        if (!error) {
            // Declare an entry for the array
            var acc = [];

            console.log(tweets.statuses.length + " Tweets found for: " + req.params.hash);
            console.log(tweets.search_metadata.next_results);

            // For each part of the tweet, extract the data we need.
            for (var i in tweets.statuses){
                val = tweets.statuses[i];
                // Only display if there is a locaiton attached.
                if(val.coordinates){
                    //console.log(val.text)
                    acc.push({
                        type       : 'tweet',
                        user       : val.id,
                        created_at : val.created_at,
                        message    : val.text,
                        latitude   : val.coordinates.coordinates[1],
                        longitude  : val.coordinates.coordinates[0],
                    })
                }
            }
            // Display the resulting JSON object in the browser.
            res = setHeaders(res);
            res.json(acc);
            // res.json(tweets.statuses[0].coordinates)
        }
    });
}

exports.getLargeSearch = function(req, res) {
    console.log('Large twitter search requested.')

    var params = {
        q: req.params.hash,
        // 4 mile radius around downtown Boston.
        geocode: "42.351252,-71.073808,5mi",
        count: 100,
        lang: "en",
        cursor: -1,
        count: 10,
    };
    

}

// Request saved tweets from stream.
// Return results from database
exports.getStream = function(req, res) {
    console.log('Fetching Cached Twitter Streams\n')

    // Parameters to restrict the stream results to.
    var params = {
        track: '#' + req.params.hash,
        lang: "en",
        geocode: "42.351252, -71.073808, 4mi",
    };

    // Query the database for tweets with a message containing the searched hash.
    var query = Tweet.where('message').regex(req.params.hash);

    // Execute the query and send the results to the browser.
    query.exec(function(err, tweets) {
        if (err) console.log(err);
        res = setHeaders(res);
        res.json(tweets);
        console.log('Tweets sent.');
    });
}

// Create a new twitter stream.
// This saves tweets under the provided
// hashtag to our database
exports.createStream = function(req, res) {
    console.log('Initialize Twitter Stream. Recording incoming tweets.\n')

    // Parameters to restrict the stream results to.
    var params = {
        track: req.params.hash,
        // 4 mile radius around downtown Boston.
        geocode: "42.351252, -71.073808, 4mi",
    };

    res = setHeaders(res);
    res.json({message: "Stream created, recording tweets for: " + req.params.hash});

    // Open a stream with 'statuses' set as the endpoint.
    twitter.stream('statuses/filter', params, function(stream){
        // If data received, do the following:
        stream.on('data', function(tweet) {
            console.log(tweet.text);

            if(tweet.coordinates) {

                // If there is location data in the tweet,
                // create a new instance of the Tweet model
                var tweetEntry = new Tweet();

                // Log the text of the tweet to the console (may switch to Socket.io)
                console.log(tweet.coordinates);

                // Populate the tweet entry for the database
                tweetEntry.type         = 'tweet'
                tweetEntry.user         = tweet.user.name;
                tweetEntry.created_at   = moment(tweet.created_at, "ddd MMMM DD HH:mm:ss Z YYYY").unix();
                tweetEntry.message      = tweet.text;
                tweetEntry.latitude     = tweet.coordinates.coordinates[1];
                tweetEntry.longitude    = tweet.coordinates.coordinates[0];

                // Save it to the database
                tweetEntry.save(function(err) {
                    if (err) {
                        console.log("Error Saving Tweet!");
                        console.log(err);
                    } else {
                        console.log("Tweet Saved to Database!\n");
                    }
                });
            } else {
                // No location in the tweet, don't save it.
                console.log('No Location Data. Tweet Not Saved.\n');
            }
        });

        // If error received, catch any errors and display them.
        stream.on('error', function(error) {
            console.log(error);
        });
    });
}
