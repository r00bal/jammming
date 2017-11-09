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
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  handleClick(e) {
    let plusOrMinus = e.target.innerText;
    plusOrMinus === '+' ? this.addTrack() : this.removeTrack();
  }
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track)
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>
    } else return <a className="Track-action" onClick={this.addTrack}>+</a>
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
