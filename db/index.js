var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/recipeApp', { useMongoClient: true });

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
  Recipe.find({}, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
}; 

// const search = (query, callback) => {
//   Recipe.find({$text: {$search: query}})
//      .skip(20)
//      .limit(10)
//      .exec((err, results) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, results);
//       }
//      });
// };

const search = (query, callback) => {
  Recipe.find({ label: query, description: query }, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
};

const getSavedRecipes = (userId, callback) => {
  User
  .findById(userId)
  .populate('savedRecipes')
  .exec((err, user) => {
    if (err) {
      callback(err, null);
    } else {
      //console.log(user.toJSON());
      callback(null, user.savedRecipes);
    }
  })
};

const saveRecipe = (recipe) => {
  // save recipe into global Recipe table
  recipe.save()
  .then((recipe) => {
    console.log('Recipe saved');
  })
}

const saveRecipeToUsersCollection = (userId, data, dest) => {
  // dest can be either savedRecipes or uploadedRecipes
  const recipe = new Recipe({
    _id: data._id,
    label: data.label,
    image: data.image,
    description: 'test description'
  });

  let query = {};
  query[dest] = recipe;

  User
  .findByIdAndUpdate(userId, { $push: query }, (err, recipe) => {
    if (err) {
      console.log('Error saving recipe to user collection');
    } else {
      console.log('saved to user collection');
      saveRecipe(recipe);
    }
  });
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
  selectAll,
  search,
  getSavedRecipes,
  saveRecipe,
  saveRecipeToUsersCollection,
  getRecipeDetails
};