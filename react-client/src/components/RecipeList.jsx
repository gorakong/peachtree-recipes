import React from 'react';
import Recipe from './Recipe.jsx';
import { Card, Grid } from 'semantic-ui-react';

const RecipeList = ({ recipeEntries, bookmarkRecipe }) => (
  <div>
	  <Card.Group itemsPerRow={5}>
	  	{ recipeEntries.map((recipeEntry, i) =>
	  		<Recipe key={ i } recipe={ recipeEntry.recipe || recipeEntry } bookmarkRecipe={ bookmarkRecipe }/>
	  	)}	  
	  </Card.Group>
  </div>
);

export default RecipeList;
