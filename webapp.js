var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var db;

var app = express();

app.use(express.static('static'));

var bugData = [
	{id: 1, priority: 'p1', status: 'open', owner: 'Ravan', title: 'app crashes on open'},
	{id: 2, priority: 'p2', status: 'new', owner: 'Eddie', title: 'Misaligned border on panel'},
];

app.get('/api/bugs', (req, res) => {
	db.collection("bugs").find().toArray((err, docs) => {
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