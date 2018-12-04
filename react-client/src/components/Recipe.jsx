import React from 'react';

const Recipe = ({ recipe, bookmarkRecipe }) => (
  <div className="recipe">
  	<img src={ recipe.image } />
    <h3 className="desc">{recipe.label}</h3>
    <button onClick={ () => bookmarkRecipe(recipe) }>Save</button>
  </div>
);

export default Recipe;