import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import config from '../../api.config.js';
import axios from 'axios';
import RecipeList from './components/RecipeList.jsx';
import Nav from './components/Nav.jsx';
import Uploads from './components/Uploads.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      header: 'Featured Recipes',
      userId: '',
      recipes: []
    }
  }

  componentDidMount() {
    this.getRecipes('cookie');
  }

  getRecipesFromAPI(query) {
    return axios.get(`https://api.edamam.com/search?q=${query}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&from=0&to=10`, { crossdomain: true });
  }

  getRecipesFromDB(query) {
    return axios.get(`/search/${query}`);
  }

  getRecipes(query) {
    axios.all([this.getRecipesFromAPI(query), this.getRecipesFromDB(query)])
      .then(axios.spread((apiResp, dbResp) => {
        console.log("search results from db: ", dbResp.data);
        const recipes  = apiResp.data.hits.concat(dbResp.data);
        console.log('all recipes: ', recipes);
        this.setState({
          userId: '5c05f5920e6d34520556afa5',
          recipes
        });
      }))
      .catch((error) => {
        console.log(error);
      })
  }

  bookmarkRecipe(recipe) {
    axios.post(`/${this.state.userId}/saved`, recipe)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
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
        console.log(`error retrieving user's saved recipes`);
      });
  }

  uploadRecipe(recipe) {
    axios.post(`/${userId}/upload`, recipe)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  registerUser(user) {
    axios.post('/create', user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    const nav = 
    this.state.isLoggedIn ? <Nav handleSearchInputChange={this.getRecipes.bind(this)} handleRegistration={this.registerUser.bind(this)} getSavedRecipes={this.getSavedRecipes.bind(this)}/>
    : <div>Guest Nav</div>;
    return (
      <div>
        { nav }
        <h1>{this.state.header}</h1>
        <Uploads isLoggedIn={this.state.isLoggedIn}/>
        <RecipeList recipeEntries={this.state.recipes} bookmarkRecipe={this.bookmarkRecipe.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));