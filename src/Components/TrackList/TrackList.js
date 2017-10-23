import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track'


//<!-- inside TrackList You will add a map method that renders a set of Track components  -->
class TrackList extends Component {

  render() {
    const tracks = this.props.tracks;
    return (
      <div className="TrackList">
        {
          this.props.tracks && this.props.tracks.map((track, i) => {
            return <Track key={track.id} track={track} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval}/>;
          })
        }

      </div>
    );
  }
}

export default TrackList;
