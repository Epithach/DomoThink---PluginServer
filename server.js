//Import modules

//Variables
var express	= require('express');        // call express
var app		= express();                 // define our app using express
var bodyParser	= require('body-parser');
var fs		= require('fs');
var port	= process.env.PORT || 8080;  // set our port
var router;				     // create a route who will use for the get request	
var files	= "";			     // Var who will contain the current of the files	
var file_list;			     // Var who will contain the list of the files in JSON



/**
 * Main
 */

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// building a route
// get an instance of the express Router
router = express.Router();              



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.statusCode = 200;
    res.json({ message: 'hooray! welcome to our api!' });    
});

//create route plugin
router.get('/plugin', function(req, res) {


    /*fs.realpath("./plugin", function(err, path) {
    	if (err) {
	    console.log(err);
	    res.statusCode = 500;
	    return;
	}
	console.log('Path is : ' + path);
    });*/

    
    fs.readdir("./plugin", function(err, files) {
	if (err) {
	    res.statusCode = 500;
	    return;
	}
	res.json(files);
	res.statusCode = 200;
	console.log(files);
    });

});

// PLUGIN
router.get('/plugin/plugin_1', function(req, res) {
    res.statusCode = 200;
    console.log("Show information from plugin_1 from /plugin");
});

router.get('/plugin/plugin_2', function(req, res) {
    res.statusCode = 200;
    console.log("Show information from plugin_2 from /plugin");
});

router.get('/plugin/plugin_3', function(req, res) {
    res.statusCode = 200;
    console.log("Show information from plugin_3 from /plugin");
});


// ROUTE STORE
router.get('/store', function(req, res) {

    fs.readdir("./store", function(err, files) {
	if (err) {
	    res.statusCode = 500;
	    return;
	}
	res.json(files);
	res.statusCode = 200;
	console.log(files);
    });
 
});

router.get('/store/plugin_1', function(req, res) {
    res.statusCode = 200;
    res.sendFile( __dirname + '/store/plugin_1'); { root : __dirname }
});

router.get('/store/plugin_2', function(req, res) {
    res.statusCode = 200;
    res.sendFile( __dirname + '/store/plugin_2'); { root : __dirname }
});

router.get('/store/plugin_3', function(req, res) {
    res.statusCode = 200;
    res.sendFile( __dirname + '/store/plugin_3'); { root : __dirname }
});

router.post('/store/install/plugin_1', function(req, res) {
    res.statusCode = 200;
    console.log("Install plugin_1 from /store");
    res.sendFile( __dirname + '/store/install/plugin_1'); { root : __dirname }
});

router.post('/store/uninstall/plugin_1', function(req, res) {
    res.statusCode = 200;
    console.log("Uninstall plugin_1 from /store");
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);
app.use('/api/plugin', router);
app.use('/api/plugin/plugin_1', router);
app.use('/api/plugin/plugin_2', router);
app.use('/api/plugin/plugin_3', router);
app.use('/api/store', router);
app.use('/api/store/store_1', router);
app.use('/api/store/store_2', router);
app.use('/api/store/store_3', router);
app.use('/api/store/install/plugin_1', router);
app.use('/api/store/uninstall/plugin_1', router);

router.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});




// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
