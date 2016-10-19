// external modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var router = require('./config/routes')
var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());
 
app.use(express.static(__dirname + "/app"));


var port = process.env.PORT || 3001;
app.get("/", function(req,res){
	res.sendFile(path.join(__dirname + "/app/index.html"));
});

app.listen(port, function() {
  console.log("Express app is listening on port: " + port);
});
