var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/makanwhere";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("makanwhere");
  dbo.createCollection("event", function(err, res) {
    if (err) throw err;
    console.log("Event collection created!");
  }) 
  dbo.createCollection("session", function(err, res) {
    if (err) throw err;
    console.log("Session collection created!");
    db.close();
  })
});

module.exports = MongoClient;
