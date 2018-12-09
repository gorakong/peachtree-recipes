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
  label: String,
  image: String,
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

var getSavedRecipes = function(id, callback) {
  User.findById(id, 'savedRecipes', function(err, recipes) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

var saveRecipe = (userId, data) => {
  const recipe = new Recipe({
    label: data.label,
    image: data.image,
    description: 'test description'
  });

  recipe.save()
  .then((recipe) => {
    console.log('result saved: ', recipe);
  })
}

var uploadRecipe = (data) => {
  const recipe = new Recipe({
    label: data.label,
    image: data.image,
    description: 'test description'
  });

  
}

module.exports = {
  selectAll,
  getSavedRecipes,
  saveRecipe
};