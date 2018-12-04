var express = require('express');
var bodyParser = require('body-parser');
var dbMethods = require('../db');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());

//var unirest = require('unirest');

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(express.static(__dirname + '/../node_modules'));

app.get('https://api.edamam.com/search', function(req, res) {
  dbMethods.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post('/:userId/saved', function(req, res, next) {
	dbMethods.saveRecipe(req.params.userId, req.body);
	res.end();
})

app.get('/:userId/saved', function(req, res) {
	dbMethods.selectAll((err, data) => {
		res.send(data);
	});
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

