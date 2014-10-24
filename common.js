exports.dbConnect = function(next) {
  console.log('dbCollect Called');
  // mongoose.connect(TL.config.db, function (err) {
  //   if (!err) {
  //     TL.logger.info("Connected to DB");
  //     //runPaymentProcessing();
  //     next();
  //   } else {
  //     TL.logger.error("Failed to connect to DB!");
  //     throw new Error("Failed to connect to DB!");
  //   }
  // });
}

exports.dbDisconnect = function() {
  // mongoose.disconnect(function (err) {
  //   if (err) return TL.logger.error(err);
  // })
}

// npm install mongodb
var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient
 
MongoClient.connect(process.env.MONGOHQ_URL, function(err, db) {
  
  // operate on the collection named "test"
  var collection = db.collection('test')
 
  // remove all records in collection (if any)
  console.log('removing documents...')

  collection.remove(function(err, result) {
    if (err) {
      return console.error(err)
    }
    console.log('collection cleared!')
    // insert two documents
    console.log('inserting new documents...')
    collection.insert([{name: 'tester'}, {name: 'coder'}], function(err, docs) {
      
      if (err) {
        return console.error(err)
      }

      console.log('just inserted ', docs.length, ' new documents!')
      
      collection.find({}).toArray(function(err, docs) {
        if (err) {
          return console.error(err)
        }
        docs.forEach(function(doc) {
          console.log('found document: ', doc)
        })
      })
    })
  })
})