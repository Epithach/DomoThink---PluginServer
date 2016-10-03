//Import modules

//Variables
var express	= require('express');        // call express
var app		= express();                 // define our app using express
var bodyParser	= require('body-parser');
var fs		= require('fs');
var port	= process.env.PORT || 8080;  // set our port
var route_get;				     // create a route who will use for the get request	

/**
 * Main
 */

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// building a route
// get an instance of the express Router
route_get = express.Router();              

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
route_get.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });    
});

//create route plugin
route_get.get('/plugin', function(req, res) {

    fs.realpath("./plugin", function(err, path) {
    	if (err) {
	    console.log(err);
	    return;
	}
	console.log('Path is : ' + path);

	
    });
    fs.readdir("./plugin", function(err, files) {
	if (err) return;
	files.forEach(function(f) {
	    console.log('Files: ' + f);

	    test = f.arguments;
	 
	});
    });
//    res.json({ message: 'hooray! welcome to Plugin !'});

    res.sendFile( __dirname + '/server.js'); { root : __dirname }
    
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
