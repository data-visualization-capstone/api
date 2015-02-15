var _       = require('underscore')
var moment  = require('moment');
var Twitter = require('twitter');

var twitter = new Twitter(DV.config.development.twitter);

exports.getSearch = function(req, res) {
    console.log('twitter search requested');

    // 4 mile radius around downtown Boston.
    var params = {
        q: "#" + req.params.hash,
        geocode: "42.351252, -71.073808, 4mi",
        count: 50,
    };

    twitter.get('search/tweets', params, function(error, tweets, response){
        if (!error) {
        // console.log(tweets.statuses)
            var acc = [];

            for (var i in tweets.statuses){
                val = tweets.statuses[i];

                acc.push({
                    user       : val.id,
                    created_at : val.created_at,
                    message    : val.text,
                    latitude   : val.coordinates.coordinates[0],
                    longitude  : val.coordinates.coordinates[1],
                })
            }

            res = setHeaders(res);
            res.json(acc);
            // res.json(tweets.statuses[0].coordinates)

        }else{
            console.log(error);
        }
    });
}

exports.getStream = function(req, res) {
    console.log('twitter stream requested')

    // 4 mile radius around downtown Boston.
    var params = {
        track: "#" + req.params.hash,
        geocode: "42.351252, -71.073808, 4mi",
    };

    var tweetEntry = new Tweet();  // create a new instance of the Tweet model

    twitter.stream('statuses/filter', params, function(stream){
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            if(tweet.coordinates != null) {
                console.log(tweet.coordinates);
                tweetEntry.user         = tweet.user.name;
                tweetEntry.created_at   = tweet.created_at;
                tweetEntry.message      = tweet.message;
                tweetEntry.latitude     = tweet.coordinates.coordinates[0];
                tweetEntry.longitude    = tweet.coordinates.coordinates[1];
            }else{
                tweetEntry.user         = tweet.user.name;
                tweetEntry.created_at   = tweet.created_at;
                tweetEntry.message      = tweet.message;
                tweetEntry.latitude     = null;
                tweetEntry.longitude    = null;
                console.log('no location');
            }
            tweetEntry.save(function(err) {
                if (err) {
                    console.log(err)
                    console.log("Error saving tweet!");
                }else{
                    console.log("Tweet saved!")
                }
            });
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
}