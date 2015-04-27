var _           = require('underscore');
var moment      = require('moment');
var instagram   = require('instagram-node').instagram();

instagram.use(DV.config.development.instagram);

exports.getSearch = function(req, res){
    console.log('instagram search requested.')
    var params = {
        // 4 mile radius around downtown Boston.
        lat: 42.351252,
        lng: -71.073808,
        distance: 3000,
    };

    instagram.media_search(params.lat, params.lng, {}, function(err, medias, remaining, limit) {
        console.log(err);
        console.log(medias);

        res = setHeaders(res);
        res.json(medias);
    });
}
