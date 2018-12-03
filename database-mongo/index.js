var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

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

module.exports.selectAll = selectAll;