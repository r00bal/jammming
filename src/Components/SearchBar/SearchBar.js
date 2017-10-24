import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(term) {
    this.props.onSearch(term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <a>SEARCH</a>
      </div>
    );
  }
}


export default SearchBar;
