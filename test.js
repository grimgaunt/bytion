

var ws = require('ws');

// include and instantiate express engine
var express = require('express');
var app = express();

// configure it to use the JSON parser for the POST'ed body
var parser = require('body-parser');
app.use(parser.json());

// Our HTTP engine for the websockets
var server = require('http').createServer(app);


// instantiate in-memory DB NEDB

var nedb = require('nedb')
var db = new nedb();

// CORS stuff 
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});



const wss = new ws.Server({ server });


// The 2 POST routes for the Express endpoints 
// The first is for the simulation of the GitHub Event



app.post('/', function(req, res){
	console.log('Post received!');
	wss.clients.forEach(function(client) {
		//console.log(JSON.stringify(client));
		console.log(req.body);
		client.send(JSON.stringify(req.body));

	});

	res.json({'status':'OK'});
});

// The 2nd is for  persisting the flagged events (addresses w/Microsoft.com)

app.post('/event', function(req, res){
	
	db.insert(req.body, function(err, result){
		if (err){

			console.log('Error - could not update DB' + errt);
			return;
		}
		// assume the insert was succesfull
		// query w/ db.query({user:'hari@microsoft.com'})
	});


});


// this is simply callback handlers for the connected state - messages are not exopected
// to be receieved from Angular to the server - only the other way around 

wss.on('connection', function connection(ws, req) {

	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
	});


});



// And, kick off the server 

server.listen(12345, function() {

	console.log(`http/ws server listening on port 12345`);
});





