import React, { Component } from 'react';
import { Button, Icon, Card } from 'semantic-ui-react';

class Recipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      heart: 'heart outline'
    };
  }

  toggleLike(recipe) {

    let heart = this.state.heart === 'heart outline' ? 'heart' : 'heart outline';

    this.setState({ heart });

  }

  render() {
    const { recipe, bookmarkRecipe } = this.props;

    const time = recipe.totalTime ? recipe.totalTime + ' mins  |  ' : '';

    const save = (
      <Icon
        link
        name={ this.state.heart }
        color="pink"
        onClick={ () => bookmarkRecipe(recipe, this.toggleLike(recipe)) }
      />
    )

    return (
      <Card className="recipe"
        raised
        href={ recipe.url }
        image={ recipe.image }
        header={ recipe.label }
        meta={ time + Math.round(recipe.calories) + ` calories` }
        description={ 'A creamy yoghurt made with harissa and saffron' }
        extra={ save }
      />
    )
  }

};

export default Recipe;