var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    dbUrl = process.env.MONGOLAB_URI,
    urlObj = {},
    ids;

function generateRandomId(currIds) {
  var randomId = Math.floor(Math.random() * 10000);
  if (currIds.indexOf(randomId) < 0) {
    return randomId;
  } else {
    generateRandomId(currIds);
  }
}

function getMongoData(originalUrl, baseUrl) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(dbUrl, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', dbUrl);
      }
      // Start db work.
      var collection = db.collection('urls'),
      shortId;

      collection.distinct("_id").then(function(data) {
        shortId = generateRandomId(data)})
        .then(function() {
          urlObj = {
            "original_url": originalUrl,
            "short_url": baseUrl + shortId
          }
          collection.insert({
            "_id": shortId,
            "original_url": originalUrl,
            "short_url": baseUrl + shortId
          }, {w: 1}, function() {
            db.close();
          });

          if (Object.keys(urlObj).length > 0) {
            resolve(urlObj);
          }
        });
    }); // End MongoDB connection
  });
}

module.exports = function(originalUrl, baseUrl) {
  return new Promise(function(resolve, reject) {
    getMongoData(originalUrl, baseUrl).then(function(data) {
      resolve(data);
    }).catch(function(err) {
      reject(err);
    });
  });
}
