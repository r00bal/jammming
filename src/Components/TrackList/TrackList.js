import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track'


//<!-- inside TrackList You will add a map method that renders a set of Track components  -->
class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
          return <Track key={track.id} track={track} />
          })
        }
      </div>
    );
  }
}

export default TrackList;
