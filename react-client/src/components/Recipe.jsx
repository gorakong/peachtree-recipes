import React from 'react';

const Recipe = ({ recipe, bookmarkRecipe }) => (
  <div>
  	<img src={ recipe.image } />
    <h3>{recipe.label}</h3>
    <button onClick={ () => bookmarkRecipe(recipe) }>Save</button>
  </div>
);

export default Recipe;