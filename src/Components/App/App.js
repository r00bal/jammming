import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id:'track1',
          name:'mezzanie',
          artist:'Massive Attack',
          album:'mezzanie'
        },
        {
          id:'track2',
          name:'50cent',
          artist:'50cent',
          album:'50cent'
        },
        {
          id:'track3',
          name:'fatboyslim',
          artist:'20syl',
          album:'flume'
        }
      ],
      playlistName: 'playlistNameame',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} isRemoval={true}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} isRemoval={false}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
