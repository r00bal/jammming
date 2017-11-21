import React, { Component } from 'react';
import './SearchBar.css';
import Button from '../Button/Button';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term:''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    if(this.state.term) {
      this.props.onSearch(this.state.term);
    } else {
      this.props.onSearch(null)
    }
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }


  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <Button onSave={this.search} buttonName={'SEARCH'} isActive={this.props.isActive}/>
      </div>
    );
  }
}


export default SearchBar;
