//Import modules

//NODE Variables
var express	= require('express');		 // call express
var app		= express();			 // define our app using express
var bodyParser	= require('body-parser');
var fs		= require('fs');
var port	= process.env.PORT || 8080;	// set our port
var router;					// create a route who will use for the request
var files = "";					// Var who will contain the current of the files
var fs;						// Var who will be used to read diles
var path = "";					// Var who will get a file path

//PGSQL Variables
var pg = require('pg');				// call pg	
var Promise = require('es6-promise').Promise;	// call "Promise", dont know what it is but it work
var manual_quer;				// create a var who wil contain the dynamic query
var query;					// create a var who will use for the sql query
var config = {					// CREATE a config to configure the sql connection
    user: 'root',				//env var: PGUSER
    database: 'EIP',				//env var: PGDATABASE
    password: 'root',				//env var: PGPASSWORD
    host: 'localhost',				// Server hosting the postgres database
    //port: 5432,				//env var: PGPORT
    max: 10,					// max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);			//initiate a connection pool who will keep idle connections


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

/***
* PLUGIN ROUTE (Need to find how to create dynamic route)
*/

router.get('/plugin/plugin_1', function(req, res) {
    res.statusCode = 200;
    console.log("Show information from plugin_1 from /plugin");

    fs = require('fs')
    fs.readFile(__dirname + '/plugin/plugin_1', 'utf8', function (err,data) {
	if (err) {
	    res.statusCode = 500;
	    return console.log(err);
	}
	res.end(data);
    });

});

router.get('/plugin/plugin_2', function(req, res) {
    res.statusCode = 200;
    console.log("Show information from plugin_2 from /plugin");

    fs = require('fs')
    fs.readFile(__dirname + '/plugin/plugin_2', 'utf8', function (err,data) {
	if (err) {
	    res.statusCode = 500;
	    return console.log(err);
	}
	res.end(data);
    });

    
});

router.get('/plugin/plugin_3', function(req, res) {
    res.statusCode = 200;
    console.log("Show information from plugin_3 from /plugin");

    fs = require('fs')
    fs.readFile(__dirname + '/plugin/plugin_3', 'utf8', function (err,data) {
	if (err) {
	    res.statusCode = 500;
	    return console.log(err);
	}
	res.end(data);
    });
    
});

/***
* STORE ROUTE
*/

// A route who will list evey plugin from the store
router.get('/store', function(req, res) {

    res.writeHead(200, { 'Content-Type': 'application/json'});

    // to run a query we can acquire a client from the pool,
    // run a query on the client, and then return the client to the pool
    pool.connect(function(err, client, done) {
	if(err) {
	    return console.error('error fetching client from pool', err);
	}
	
	query = client.query('select id, name, info, creator from store', function(err, result) {
	    if (err) {
		result.writeHead(200, { 'Content-Type': 'application/json'});
		return console.error('SQL Query failed');
	    }
	    console.log(result.rows);
	    res.end(JSON.stringify(result.rows));
	});
    });
    pool.on('error', function (err, client) {
	console.error('idle client error', err.message, err.stack)
    })
    
    
});

//Get plugin info by the database
router.get('/store/:id', function(req, res) {

    pool.connect(function(err, client, done) {
	if(err) {
	    return console.error('error fetching client from pool', err);
	}
	
	manual_quer = 'select id, name, info, creator from store where id=' + req.params.id;

	query = client.query(manual_quer, function(err, result) {
	    if (err) {
		result.writeHead(200, { 'Content-Type': 'application/json'});
		return console.error('SQL Query failed');
	    }
	    console.log(result.rows);
	    res.json(result.rows);
	});
    });
    pool.on('error', function (err, client) {
	console.error('idle client error', err.message, err.stack)
    })
});

//Download plugin_id
router.post('/store/install/:id', function(req, res) {
    res.statusCode = 200;

    path = "/store/install/plugin_" + req.params.id; 
    console.log("Install plugin_%d from : %s", req.params.id, path);
    res.sendFile( __dirname + path); { root : __dirname }
});

router.post('/store/uninstall/:id', function(req, res) {
    res.statusCode = 200;
    path = "/plugin/plugin_" + req.params.id;
    console.log("Uninstall plugin_%d from /store", req.params.id);
});


var PythonShell = require('python-shell');

var pypath = "caca";
PythonShell.run('remove-plugin.py', pypath, function (err) {
    if (err) throw err;
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api


app.use('/api', router);
app.use('/api/plugin', router);
app.use('/api/plugin/plugin_1', router);
app.use('/api/plugin/plugin_2', router);
app.use('/api/plugin/plugin_3', router);
app.use('/api/store', router);
app.use('/api/store/:id', router);
app.use('/api/store/install/:id', router);
app.use('/api/store/uninstall/:id', router);

router.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
