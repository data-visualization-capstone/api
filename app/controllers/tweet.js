var _       = require('underscore')
var moment  = require('moment');
var Twitter = require('twitter');

var twitter = new Twitter(DV.config.development.twitter);

exports.getSearch = function(req, res) {
    console.log('Twitter search requested');

    var params = {
        q: '#' + req.params.hash,
        // 4 mile radius around downtown Boston.
        geocode: "42.351252, -71.073808, 4mi",
        count: 50,
    };
    // Make a get request to twitter for searches on tweets.
    twitter.get('search/tweets', params, function(error, tweets, response){
        if (!error) {
            // Declare an entry for the array
            var acc = [];
            // For each part of the tweet, extract the data we need.
            for (var i in tweets.statuses){
                val = tweets.statuses[i];
                // Only display if there is a locaiton attached.
                if(val.coordinates){
                    acc.push({
                        user       : val.id,
                        created_at : val.created_at,
                        message    : val.text,
                        latitude   : val.coordinates.coordinates[0],
                        longitude  : val.coordinates.coordinates[1],
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

exports.getStream = function(req, res) {
    console.log('Twitter stream requested')
    // Parameters to restrict the stream results to.
    var params = {
        track: '#' + req.params.hash,
        // 4 mile radius around downtown Boston.
        geocode: "42.351252, -71.073808, 4mi",
    };
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
                tweetEntry.user         = tweet.user.name;
                tweetEntry.created_at   = moment(tweet.created_at, "ddd MMMM DD HH:mm:ss Z YYYY").unix();
                tweetEntry.message      = tweet.message;
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