import {Secret} from './Secret.js';

let accessToken;
const CLIENT_ID = Secret.ID;
const REDIRECT_URI = "http://localhost:3000/";

 const Spotify = {
   getAccessToken() {
     if (accessToken) {
      return accessToken;
    }

    // check the URL to see if access token has just been obtained
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
        let accessToken = accessTokenMatch[1];
        let expiresIn = expiresInMatch[1];

        // Clear the parameters from the URL,
        // so the app doesn't try grabbing the access token after it has expired
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        let url = 'https://accounts.spotify.com/authorize?';
        url += `client_id=${CLIENT_ID}&`;
        url += 'response_type=token&';
        url += 'scope=playlist-modify-public&';
        //url += 'scope=playlist-modify-private&';
        url +=  `redirect_uri=${REDIRECT_URI}`;
        window.location = url;
        }
   },

   search(term) {
    accessToken = Spotify.getAccessToken();
    const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(urlToFetch, {
        headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName,trackUris) {

    if (!playlistName || !trackUris) {
      return;
    }

    accessToken = Spotify.getAccessToken();
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
      }
console.log(accessToken);
    let user_id = '';
    let playlist_id = '';
    const urlToFetch = 'https://api.spotify.com/v1/me';
    return fetch(urlToFetch, {headers: headers}).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        console.log(jsonResponse);
        user_id = jsonResponse.id;
        const urlToFetch = `https://api.spotify.com/v1/users/${user_id}/playlists`;
        console.log(urlToFetch);
        return fetch(urlToFetch, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name:playlistName})
        }).then(resposne => {
          if (resposne.ok) {
            return resposne.json();
          }
          throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)
      ).then(jsonResponse => {
        console.log(jsonResponse);
        playlist_id = jsonResponse.id;
        console.log(trackUris);
       console.log(playlist_id);
     }).then(() => {
       const urlToFetch = `https://api.spotify.com//v1/users/${user_id}/playlists/${playlist_id}/tracks`;
       console.log(urlToFetch);
        return fetch(urlToFetch, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify({uris:trackUris})
       }).then(resposne => {
         console.log(resposne);
       }, networkError => console.log(networkError.message)
     ).then(jsonResponse => {
       console.log(jsonResponse);

    });
     });
      });
    }
  }


 export default Spotify;
