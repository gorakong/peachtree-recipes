import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const Recipe = ({ recipe, bookmarkRecipe }) => (
  <div className="recipe">
  	<img src={ recipe.image } />
    <h3 className="desc">{recipe.label}</h3>   
    <div class='ui right labeled button'>
    <Button
      onClick={ () => bookmarkRecipe(recipe) }
      content='Save'
      icon='heart'
    />
    </div>
  </div>
);

export default Recipe;
//<button class="ui right labeled button" onClick={ () => bookmarkRecipe(recipe) }>Save</button>