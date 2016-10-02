//Import modules

//Variables
var express    = require('express');        // call express
var app        = express();                 // define our app using express
`var bodyParser = require('body-parser');
var fs = require('fs');
    

/**
 * Main
 */

console.log("caca");

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;       

// building a route
var route_get = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
route_get.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });    
});

//create route plugin
route_get.get('/plugin', function(req, res) {
    res.json({ message: 'hooray! welcome to Plugin !' });

    fs.realpath(__dirname, function(err, path) {
    	if (err) {
	    console.log(err);
	    return;
	}
	console.log('Path is : ' + path);
    });
    fs.readdir(__dirname, function(err, files) {
	if (err) return;
	files.forEach(function(f) {
	    console.log('Files: ' + f);
	});
    });     
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', route_get);
app.use('/api/plugin', route_get);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
