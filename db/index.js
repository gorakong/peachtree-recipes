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
recipeSchema.index({ label: 'text', description: 'text' });

const Recipe = mongoose.model('Recipe', recipeSchema);

const userSchema = mongoose.Schema({
    username: String,
    savedRecipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }],
    uploadedRecipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }]
});

const User = mongoose.model('User', userSchema);

const selectAll = (callback) => {
  Recipe.find({}, (err, recipes) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

const search = (query, callback) => {
  Recipe.find({$text: {$search: query}})
     .skip(20)
     .limit(10)
     .exec((err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
     });
};

const getSavedRecipes = (id, callback) => {
  User.findById(id, 'savedRecipes', (err, recipes) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

const saveRecipe = (userId, data) => {
  // save recipe into user's saved recipes collection
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

const saveRecipeToUsersCollection = (userId, data) => {
  User
  .findOne({ _id: userId })
  .populate('savedRecipes')
  .exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      uploadRecipe(data);
      console.log('population successful');
    }
  })
}

const uploadRecipe = (data) => {
  // upload recipe into Recipe db
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

const getRecipeDetails = (id, callback) => {
  Recipe.findById(id, (err, recipeDetails) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, recipeDetails);
    }
  });
}

module.exports = {
  search,
  selectAll,
  getSavedRecipes,
  saveRecipe,
  getRecipeDetails
};