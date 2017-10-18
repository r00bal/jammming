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
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist}</p>
          <p>{this.props.track.album}</p>
        </div>
        <a className="Track-action">+ or minus</a>
      </div>
    );
  }
}

export default Track;
