const express = require('express');
const bodyParser = require('body-parser');
const dbMethods = require('../db');
const cors = require('cors');
const multer = require('multer');
const storage = require('multer-gridfs-storage')({
	url: 'mongodb://localhost/recipeApp'
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(express.static(__dirname + '/../node_modules'));

app.get('/search/:query', (req, res) => {
	dbMethods.search(req.params.query, (err, data) => {
		res.send(data);
	});
});

app.get('/:userId/saved', (req, res) => {
	dbMethods.getSavedRecipes(req.params.userId, (err, data) => {
		if (err) console.log('Error retrieving saved recipes');
		res.send(data);
	});
});

app.post('/:userId/saved', (req, res, next) => {
	//save recipe to users saved collection & recipe db
	dbMethods.saveRecipe(req.body, (err, result) => {
		if (err) console.log('Error saving recipe');
		dbMethods.saveRecipeToUsersCollection(req.params.userId, result, 'savedRecipes');
	});
	res.end();
});

app.get('/:userId/uploads', (req, res) => {
	dbMethods.getUploadedRecipes(req.params.userId, (err, data) => {
		if (err) console.log('Error retrieving uploads');
		res.send(data);
	});
})

app.post('/:userId/uploads', (req, res) => {
	// save recipe to user's uploads collection & recipe db

	Recipe.create({
		_id: data._id,
		label: data.label,
		image: data.image,
		description: 'test description'
	});

	let file = req.file;
	
	console.log('In server.file is: ', file);

	dbMethods.saveRecipe(recipe, (err, result) => {
		if (err) console.log('Error uploading recipe to server');
		dbMethods.saveRecipeToUsersCollection(req.params.userId, file, 'uploadedRecipes');
	});
	res.end();
})

app.get('/:recipeId', (req, res) => {
	dbMethods.getRecipeDetails(req.params.recipeId, (err, data) => {
		res.send(data);
	});
})

app.listen(3000, () => {
	console.log('listening on port 3000!');
});

