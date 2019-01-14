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
    return (
      <div className="search-bar form-inline">
        <Input
          icon='search'
          placeholder='Search...' 
          value={this.state.value}
          onChange={(e) => this.handleInputChange(e.target.value)}
        />
        <Button content='Search' onClick={() => this.props.handleSearchInputChange(this.state.value)} />
        <Button content='Saved Recipes' onClick={() => this.props.getSavedRecipes()} />
      </div>
    );
  }
}

export default Nav;