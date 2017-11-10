import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Message from '../Message/Message';
import Spotify from '../../util/Spotify.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      searchInProgress: false,
      savingInProgress: false,
      message: 'Sample message'
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.activePogressState = this.activePogressState.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  addTrack(track) {
    const actualPlaylistTracks = this.state.playlistTracks;
    const statment = actualPlaylistTracks.some(trackIsOnThePlaylist => track.id === trackIsOnThePlaylist.id);
    if (!statment) {
      actualPlaylistTracks.push(track);
      this.setState({playlistTracks : actualPlaylistTracks})
    } else {
      console.log('already in the playlist')
    }
  }

  removeTrack(trackToRemove) {
   let actualPlaylistTracks = this.state.playlistTracks;
   actualPlaylistTracks = actualPlaylistTracks.filter(track => {
     return track.id !== trackToRemove.id;
   });
   this.setState({playlistTracks : actualPlaylistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName:name});
  }

  activePogressState(progress, active) {
      this.setState({[progress]:active});
  }

  resetMessage() {
    this.setState({message:''});
  }

  showMessage(message) {
    this.setState({message:message});
  }

  savePlaylist() {
    this.activePogressState('savingInProgress', true);
    console.log('star saving');

    let tracksToSave = this.state.playlistTracks.map(track => track.uri);
    let playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, tracksToSave).then((resposne) => {
      console.log(resposne);
      if (resposne.snapshot_id) {
          console.log('Your song has been saved sucessfuly');
          this.showMessage('Your song has been saved sucessfuly');
      }

		  this.activePogressState('savingInProgress', false);


      this.setState({
        playlistName: 'New Playlist',
        playlistTracks : [],
      });
    })

  }

  search(term) {
    console.log('start loading');
    this.activePogressState('searchInProgress', true);
    Spotify.search(term).then(searchResults => {

      console.log('finish loading');
      this.activePogressState('searchInProgress', false);
      this.setState({searchResults : searchResults})
      if (searchResults.length < 1) {
        console.log(searchResults.length);
        this.showMessage('Could not found the song you are lookig for, please try with diffrent name');
        console.log('Could not found the song you are lookig for, please try with diffrent name');
      };
    })
  }

  render() {
    return (
      <div>
        <Message
          text={this.state.message}
          resetMessage={this.resetMessage}/>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
            active={this.state.searchInProgress}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              isRemoval={true}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              nRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              active={this.state.savingInProgress}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
