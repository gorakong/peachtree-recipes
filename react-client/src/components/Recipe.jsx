import React from 'react';

const Recipe = ({ recipe, bookmarked }) => (
  <div>
  	<img src={recipe.image} />
    <h3>{recipe.label}</h3>
  </div>
);

export default Recipe;