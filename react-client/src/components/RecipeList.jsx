import React from 'react';
import Recipe from './Recipe.jsx';

const RecipeList = ({ recipeEntries }) => (
  <div>
    { recipeEntries.map((recipeEntry) => 
    	<Recipe key={ recipeEntry.recipe.uri } recipe={ recipeEntry.recipe } bookmarked={ recipeEntry.bookmarked }/>
    )}
  </div>
);

export default RecipeList;