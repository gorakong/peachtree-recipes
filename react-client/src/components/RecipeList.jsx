import React from 'react';
import Recipe from './Recipe.jsx';

const RecipeList = ({ recipeEntries, bookmarkRecipe }) => (
  <div>
    { recipeEntries.map((recipeEntry, i) => 
    	<Recipe key={ i } recipe={ recipeEntry.recipe || recipeEntry } bookmarkRecipe={ bookmarkRecipe }/>
    )}
  </div>
);

export default RecipeList;