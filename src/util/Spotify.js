import {Secret} from './Secret.js';

let accessToken;
const CLIENT_ID = Secret.ID;
const REDIRECT_URI = "http://localhost:3000/";

 const Spotify = {
   getAccessToken() {
     if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }

    // check the URL to see if access token has just been obtained
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        let expiresIn = expiresInMatch[1];

        // Clear the parameters from the URL,
        // so the app doesn't try grabbing the access token after it has expired
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        let url = 'https://accounts.spotify.com/authorize?';
        url += `client_id=${client_id}&`;
        url += 'response_type=token&';
        url += 'scope=playlist-modify-public&';
        url +=  `redirect_uri=${redirect_uri}`;
        window.location = url;
        }
   }

   search(term) {
    console.log(accessToken);
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
      if (jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(track => {
          console.log(track);
          return {
            ID: track.is,
            Name: track.name,
            Artist: track.artists[0].name,
            Album: track.album.name,
            URI: track.uri
          }
        })
      }
    })
  }
 }

 export default Spotify;
