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
      header: 'Featured Recipes',
      userId: '',
      recipes: []
    }
  }

  componentDidMount() {
    this.getRecipes('cookie');
  }

  getRecipes(query) {
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&from=0&to=10`, { crossdomain: true })
      .then((response) => {
        this.setState({
          userId: '5c05f5920e6d34520556afa5',
          recipes: response.data.hits
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  bookmarkRecipe(recipe) {
    axios.post(`/${this.state.userId}/saved`, recipe)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  registerUser(user) {
    axios.post('/create', user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getSavedRecipes() {
    const { userId } = this.state;

    axios.get(`/${userId}/saved`)
      .then((response) => {
        console.log('response is ', response.data);
        this.setState({
          header: 'Saved Recipes',
          recipes: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    return (
      <div>
        <Nav handleSearchInputChange={this.getRecipes.bind(this)} handleRegistration={this.registerUser.bind(this)} getSavedRecipes={this.getSavedRecipes.bind(this)}/>
        <h1>{this.state.header}</h1>
        <RecipeList recipeEntries={this.state.recipes} bookmarkRecipe={this.bookmarkRecipe.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));