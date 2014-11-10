// http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/


// Test API
// exports.findAll = function(req, res) {
// 	console.log("user.findAll();")
//     res.send([{name:'user1'}, {name:'user2'}, {name:'user3'}]);
// };
 
// exports.findById = function(req, res) {
// 	console.log("user.findById();")
//     res.send({id:req.params.id, name: "The Name", description: "description"});
// };

// Test Database

// Define db
// var server = new Server('localhost', 27017, {auto_reconnect: true});
// db = new Db('winedb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'capstone' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) { console.log("The 'users' collection doesn't exist. "); }
        });
    }
});

exports.findById = function(req, res) {
    
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addUser = function(req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}
 
exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 