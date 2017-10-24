
import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const playlistName = event.target.value;
    console.log(playlistName);
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <div className={'New Playlist'}>
        <input defaultValue="New Playlist" onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
