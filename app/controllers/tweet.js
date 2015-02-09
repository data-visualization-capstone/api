var _       = require('underscore')
var moment  = require('moment');
var Twitter = require('twitter');

var twitter = new Twitter(DV.config.development.twitter);

exports.getSearch = function(req, res) {
    console.log('twitter search requested');

    var params = {
        q: "#" + req.params.hash,
        geocode: "42.350000,-71.060000,2mi",
        count: 50,
    };

    twitter.get('search/tweets', params, function(error, tweets, response){
        if (!error) {
        // console.log(tweets.statuses)

        var acc = [];

        for (var i in tweets.statuses){
            val = tweets.statuses[i];

            acc.push({
                userId    : val.id,
                date      : val.created_at,
                message   : val.text,
                latitude  : val.coordinates.coordinates[0],
                longitude : val.coordinates.coordinates[1],
            })
        }

        res = setHeaders(res);
        res.json(acc);
        // res.json(tweets.statuses[0].coordinates)

        }
    });
}

exports.getStream = function(req, res) {
    console.log('twitter stream requested')

    var params = {
        track: "#" + req.params.hash,
        geocode: "42.351252, -71.073808, 4mi",
    };

    var tweetEntry = new Location();  // create a new instance of the Location model

    twitter.stream('statuses/filter', params, function(stream){
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            if(tweet.coordinates != null) {
                console.log(tweet.coordinates);
                tweetEntry.userId       = tweet.user.name;
                tweetEntry.latitude     = tweet.coordinates.coordinates[0];
                tweetEntry.longitude    = tweet.coordinates.coordinates[1];
                tweetEntry.date         = tweet.created_at;
            }else{
                tweetEntry.userId       = tweet.user.name;
                tweetEntry.date         = tweet.created_at;
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