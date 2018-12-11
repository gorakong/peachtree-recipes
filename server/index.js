var express = require('express');
var bodyParser = require('body-parser');
var dbMethods = require('../db');
const cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(express.static(__dirname + '/../node_modules'));

app.get('/search', function(req, res) {
  dbMethods.selectAll((err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post('/:userId/saved', function(req, res, next) {
	//save recipe to users collection
	dbMethods.saveRecipe(req.params.userId, req.body);
	res.end();
});

app.get('/:userId/saved', function(req, res) {
	dbMethods.selectAll((err, data) => {
		res.send(data);
	});
});

app.post('/:userId/upload', function(req, res) {
	// save recipe to recipe db
	dbMethods.uploadRecipe()
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

