import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import RecipeList from './components/RecipeList.jsx';
import Nav from './components/Nav.jsx';
import config from '../../api.config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.edamam.com/search?q=chicken&app_id=${config.APP_ID}&app_key=${config.API_KEY}&from=0&to=6&calories=591-722&health=alcohol-free`)
      .then((response) => {
        this.setState({
          recipes: response.data.hits
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    return (
      <div>
        <Nav />
        <h1>Featured Recipes</h1>
        <RecipeList recipeEntries={this.state.recipes}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));