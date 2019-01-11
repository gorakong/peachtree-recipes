import React from 'react';
import Recipe from './Recipe.jsx';
import { Grid } from 'semantic-ui-react';

const RecipeList = ({ recipeEntries, bookmarkRecipe }) => (
  <div>
	  <Grid container columns={5}>
		{ recipeEntries.map((recipeEntry, i) =>
			<Grid.Column width={3}>
				<Recipe key={ i } recipe={ recipeEntry.recipe || recipeEntry } bookmarkRecipe={ bookmarkRecipe }/>
			</Grid.Column>
		)}
	  </Grid>
  </div>
);

export default RecipeList;