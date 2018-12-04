import React from 'react';

class Nav extends React.Component {
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
        <input
          className="form-control"
          type="text"
          value={this.state.value}
          onChange={(e) => this.handleInputChange(e.target.value)}
        />
        <button className="btn hidden-sm-down">
          <span className="glyphicon glyphicon-search" onClick={() => this.props.handleSearchInputChange(this.state.value)}>Search</span>
        </button>
        <button className="btn saved" onClick={() => this.props.getSavedRecipes()}>Saved Recipes</button>
      </div>
    );
  }
}

export default Nav;
