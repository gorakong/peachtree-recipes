import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleInputChange(value) {
    //this.props.handleSearchInputChange(e.target.value);
    this.setState({
      value
    });
  }

  render() {
    const { handleSearchInputChange, getSavedRecipes, handleUploads } = this.props;

    return (
      <div className="search-bar form-inline">
        <Input
          icon='search'
          placeholder='Search...' 
          value={this.state.value}
          onChange={(e) => this.handleInputChange(e.target.value)}
        />
        <Button id='searchButton' color='pink' content='Search' onClick={() => handleSearchInputChange(this.state.value)} />
        <Button content='Saved Recipes' color='pink' onClick={() => getSavedRecipes()} />
        <Button color='pink' content="Submit a Recipe" onClick={() => handleUploads('upload')}/>
      </div>
    );
  }
}

export default Nav;