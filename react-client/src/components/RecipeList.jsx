import React from 'react';
import Recipe from './Recipe.jsx';

const RecipeList = ({ recipeEntries, bookmarkRecipe }) => (
  <div>
    { recipeEntries.map((recipeEntry) => 
    	<Recipe key={ recipeEntry.recipe.uri } recipe={ recipeEntry.recipe } bookmarkRecipe={ bookmarkRecipe }/>
    )}
  </div>
);

export default RecipeList;