var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var db;

var app = express();

app.use(express.static('static'));

app.get('/api/bugs', (req, res) => {

	console.log("Query string", req.query);

	var filter = {};

	if (req.query.priority)
		filter.priority = req.query.priority;
	if (req.query.status)
		filter.status = req.query.status;


	db.collection("bugs").find(filter).toArray((err, docs) => {
		res.json(docs);
	});
});

app.use(bodyParser.json());

app.post('/api/bugs/', (req, res) => {
	console.log("Req body:", req.body);
	var newBug = req.body;
	db.collection("bugs").insertOne(newBug, (err, result) => {
		var newId = result.insertedId;
		db.collection("bugs").find({ _id: newId}).next((err, doc) => {
			res.json(doc);
		});
	});
});

MongoClient.connect('mongodb://localhost/bugsdb', (err, dbConnection) => {
	db = dbConnection;
	var server = app.listen(3000, () => {
		var port = server.address().port;
		console.log("Started server at porttt", port);
	});
});