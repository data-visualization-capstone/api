// Load mongodb
var mongodb = require('mongodb');
// Load URL module for URL parsing and resolution
var url = require('url');

// Shorthand to the console log
var log = console.log;
// Store the database name field in its own variable
var dbName = global.DV.config.dbName;

// Initialize connection to MongoDB
// TODO: Find out if mongo needs to be loaded at all, mongoose may be all that's needed
exports.dbConnect = function(next) {
  mongodb.Db.connect(global.DV.config.connectURL, function(error, client) {
    // Throw any error encountered while connecting to the database
    if (error) throw error;
    
    client.collectionNames(function(error, names){
      if(error) throw error;

      // output all collection names
      // log("")
      // log("Collections");
      // log("===========");
      
      // var lastCollection = null;

      // names.forEach(function(colData){
      //   var colName = colData.name.replace(dbName + ".", '')
      //   log(colName);
      //   lastCollection = colName;
      // });

      // var collection = new mongodb.Collection(client, lastCollection);
      
      // log("\nDocuments in " + lastCollection );

      // var documents = collection.find({}, {limit:5});

      // // output a count of all documents found
      // documents.count(function(error, count){
      //   log("  " + count + " documents(s) found");
      //   log("====================");

      //   // output the first 5 documents
      //   documents.toArray(function(error, docs) {
      //     if(error) throw error;

      //     docs.forEach(function(doc){
      //       log(doc);
      //     });

      //     // close the connection
      //     client.close();
      //   });
      // });
    });
  });
}
// Disconnect from mongoose and throw error if encountered
exports.dbDisconnect = function() {
  mongoose.disconnect(function (err) {
    if (err) return TL.logger.error(err);
  })
}
