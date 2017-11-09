
import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import Button from '../Button/Button';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <div className={'New Playlist'}>
        <input
          id='playlistName'
          value={this.props.playlistName}
          onChange={this.handleNameChange}/>
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}/>
        <Button
          onSave={this.props.onSave}
          buttonName={'Save to spotify'}
          active={this.props.active}/>
      </div>
    );
  }
}

export default Playlist;
