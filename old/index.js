// Declare every variable
var		args;
const		port;
var		http;
var		server;

//Getting the first arg and trying to set in a const value - It doesn't work :'(
args = process.argv.slice(2);
port = args;

//Getting the HTTP module
http = require('http');

//Creating a server with a method "CreateServer", where we give 2 argument : Request & Response
server = http.createServer(function(req, res) {

    res.writeHead(200); // Sending a HTTP code - Ex: 404 not found, 500 crash, etc.
    res.end("Hello my bro"); //Sending a response to the users

    if (req.method === 'POST') { // POST Request
	res.end("POST MASTA");
	console.log("POST MASTA");
    }
    else if (req.method === 'GET') {	// Get Request
	res.end("GET MASTA");
	console.log("GET MASTA");
    }
    res.end(); 

    
});

//Listening on the port 1333 - Need to use var in parameters
server.listen(1333);

//Printing a message on the terminal
console.log("HTTP Server is running on the port " + 1333);
