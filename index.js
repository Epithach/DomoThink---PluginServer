const net = require('net');

const server = net.createServer(function(c) {
    // 'connection' listener
    console.log('client connected');

    c.on('data', function (data) {
	console.log(c.name + "> " + data, c);
    });
    c.on('end', function() {
	console.log('client disconnected');
    });
    
    c.write('hello !');
    c.pipe(c);
});

server.on('error', function(err) {
    throw err;
});

server.listen(8125, function() {
    console.log('server bound');
});
