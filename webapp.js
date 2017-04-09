var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'));

var bugData = [
	{id: 1, priority: 'p1', status: 'open', owner: 'Ravan', title: 'app crashes on open'},
	{id: 2, priority: 'p2', status: 'new', owner: 'Eddie', title: 'Misaligned border on panel'},
];

app.get('/api/bugs', (req, res) => {
	// res.status(200).send(JSON.stringify(bugData));
	res.json(bugData);
});

app.use(bodyParser.json());

app.post('/api/bugs/', (req, res) => {
	console.log("Req body:", req.body);
	var newBug = req.body;
	newBug.id = bugData.length + 1;
	bugData.push(newBug);
	res.json(newBug);
});

var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log("started server at port", port);
});