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
    res.end("Hello my bro");
});

//Listening on the port 1333 - Need to use var in parameters
server.listen(1333);

//Printing a message on the terminal
console.log("HTTP Server is running on the port " + 1333);
