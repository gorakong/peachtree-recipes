import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import config from '../../../api.config.js';
import axios from 'axios';
import RecipeList from './RecipeList.jsx';
import Nav from './Nav.jsx';
import Uploads from './Uploads.jsx';
import { Button } from 'semantic-ui-react';

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
      page: 'landing',
      header: 'Featured Recipes',
      userId: '',
      recipes: []
    }
  }

  componentDidMount() {
    this.getRecipes('cookie');
  }

  getRecipesFromAPI(query) {
    return axios.get(`https://api.edamam.com/search?q=${query}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&from=0&to=20`, { crossdomain: true });
  }

  getRecipesFromDB(query) {
    return axios.get(`/search/${query}`);
  }

  getRecipes(query) {
    axios.all([this.getRecipesFromAPI(query), this.getRecipesFromDB(query)])
      .then(axios.spread((apiResp, dbResp) => {
        const recipes  = apiResp.data.hits.concat(dbResp.data);
        console.log(recipes);
        this.setState({
          userId: '5c05f5920e6d34520556afa5',
          recipes
        });
      }))
      .catch((error) => {
        console.log(error);
      })
  }

  bookmarkRecipe(recipe, cb) {
    axios.post(`/${this.state.userId}/saved`, recipe)
      .then(cb)
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

  handleUploadButtonClick(targetPage) {
    const { page } = targetPage;

    this.setState({ page });
  }

  render () {
    const nav = 
    this.state.isLoggedIn ? 
    <Nav handleSearchInputChange={this.getRecipes.bind(this)} handleRegistration={this.registerUser.bind(this)} 
    getSavedRecipes={this.getSavedRecipes.bind(this)} handleUploads={this.handleUploadButtonClick.bind(this)}/>
    : <div>Guest Nav</div>;

    // possibly replace with a switch statement when more pages added
    const pageContents = 
    this.state.page === 'landing' ? 
        <RecipeList recipeEntries={this.state.recipes} bookmarkRecipe={this.bookmarkRecipe.bind(this)}/> :
        <Uploads isLoggedIn={this.state.isLoggedIn} userId={this.state.userId}/>

    return (
      <div>
        { nav }
        <h1>{this.state.header}</h1>
        { pageContents }
      </div>
    )
  }
}

export default Index;
