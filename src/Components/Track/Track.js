import React, { Component } from 'react';
import './Track.css';

/*  <div className="Track">
    <div className="Track-information">
      <h3><!-- track name will go here --></h3>
      <p><!-- track artist will go here--> | <!-- track album will go here --></p>
    </div>
    <a className="Track-action"><!-- + or - will go here --></a>
  </div>
  */

class Track extends Component {
  renderAaction() {
    if (this.props.isRemoval === true) {
      return '-';
    } else return '+';
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>Track name</h3>
          <p>Artist or Album</p>
        </div>
        <a className="Track-action">+ or minus</a>
      </div>
    );
  }
}

export default Track;
