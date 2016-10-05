//Import modules

//Variables
var express	= require('express');        // call express
var app		= express();                 // define our app using express
var bodyParser	= require('body-parser');
var fs		= require('fs');
var port	= process.env.PORT || 8080;  // set our port
var route_get;				     // create a route who will use for the get request	
var files	= "";			     // Var who will contain the current of the files	
var file_list;			     // Var who will contain the list of the files in JSON


//file_list += "{ \"Files\" : [\n{\\n";


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

	files.forEach(function(files) {
//	    console.log('Files: ' + files);
	    console.log(files);
	    file_list += "\n" + files;
	});
    });

    res.json({ file_list, files });

    
//    file_list += "]\n}";
    
    console.log(file_list);
//    res.json({ message: 'hooray! welcome to our api!' });

    file_list = "";
});


route_get.get('/plugin/plugin_1', function(req, res) {
    res.sendFile( __dirname + '/plugin/plugin_1'); { root : __dirname }
});

route_get.get('/plugin/plugin_2', function(req, res) {
    res.sendFile( __dirname + '/plugin/plugin_2'); { root : __dirname }
});

route_get.get('/plugin/plugin_3', function(req, res) {
    res.sendFile( __dirname + '/plugin/plugin_3'); { root : __dirname }
});

route_get.get('/store', function(req, res) {
    console.log("Show every file from /store");
});

route_get.get('/store/plugin_1', function(req, res) {
    console.log("Show information from plugin_1 from /store");
});

route_get.get('/store/plugin_2', function(req, res) {
    console.log("Show information from plugin_2 from /store");
});

route_get.get('/store/plugin_3', function(req, res) {
    console.log("Show information from plugin_3 from /store");
});

route_get.post('/store/install/plugin_1', function(req, res) {
    console.log("Install plugin_1 from /store");
});

route_get.post('/store/uninstall/plugin_1', function(req, res) {
    console.log("Uninstall plugin_1 from /store");
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', route_get);
app.use('/api/plugin', route_get);
app.use('/api/plugin/plugin_1', route_get);
app.use('/api/plugin/plugin_2', route_get);
app.use('/api/plugin/plugin_3', route_get);
app.use('/api/store', route_get);
app.use('/api/store/store_1', route_get);
app.use('/api/store/store_2', route_get);
app.use('/api/store/store_3', route_get);
app.use('/api/store/install/plugin_1', route_get);
app.use('/api/store/uninstall/plugin_1', route_get);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
