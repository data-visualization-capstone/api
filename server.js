console.log("Server Starting...")

// Module dependencies:
var express = require("express")
  , app = express()                               // Express
  , http = require("http").createServer(app)      // HTTP
  , bodyParser = require("body-parser")           // Body-parser
  , _ = require("underscore");                    // Underscore.js

var participants = [];

// Server config
app.set("ip", "127.0.0.1");              // Set IP
app.set("port", 8080);                   // Set Port
app.set("views", __dirname + "/views");  // Set /views folder
app.set("view engine", "jade");          // Use Jade for HTML parsing

// Specify public folder
app.use(express.static("public", __dirname + "/public"));

// Support JSON requests
app.use(bodyParser.json());

/*****************************
           ROUTING
 *****************************/

// Home
app.get("/", function(request, response) {
  	response.render("index");
});

// Test Express -> Return JSON Object
app.get("/test", function(request, response) {
  	response.json(200, {message: "express is cool"});
});

/*****************************
        API Response
 *****************************/

app.post("/message", function(request, response) {
  // Example: $ curl -X POST -H 'Content-Type:application/json' 'http://localhost:8080/message' -d '{"message":"Good News Everyone!"}'

  // request = {message : msg, name : name};
  var message = request.body.message;

  // Error Handling
  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }

  //We also expect the sender's name with the message
  var name = request.body.name;

  // Success
  response.json(200, {message: "Message received"});
});

// Start HTTP server
http.listen(app.get("port"), app.get("ip"), function() {
  console.log("Server up and running.");
  console.log("URL: http://" + app.get("ip") + ":" + app.get("port"));
});