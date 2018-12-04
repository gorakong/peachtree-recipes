var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipeApp');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var recipeSchema = mongoose.Schema({
  name: String,
  picture: String,
  description: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

var userSchema = mongoose.Schema({
    username: String,
    savedRecipes: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Recipe'
    }],
    uploadedRecipes: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Recipe'
    }]
});

const User = mongoose.model('User', userSchema);

var selectAll = function(callback) {
  Recipe.find({}, function(err, recipes) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

var getSavedRecipes = function(callback) {
  User.find({}, 'savedRecipes', function(err, recipes) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

var saveRecipe = (data) => {
  const recipe = new Recipe({
    name: data.label,
    picture: data.image,
    description: 'test'
  });

  recipe.save()
  .then((recipe) => {
    console.log('result saved: ', recipe);
  })
}

module.exports = {
  selectAll,
  getSavedRecipes,
  saveRecipe
};