import {Secret} from './Secret.js';

let accessToken;
const CLIENT_ID = Secret.ID;
const REDIRECT_URI = "http://localhost:3000";

const Spotify = {

 getAccessToken() {
   if (!accessToken) {
     let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
     let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      // check the URL to see if access token has just been obtained
     if (accessTokenMatch && expiresInMatch) {
         accessToken = accessTokenMatch[1];
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
           url +=  `redirect_uri=${REDIRECT_URI}`;
           window.location = url;
         }
    }
    return accessToken;
 },


 // create request object
 request(url, body) {

  const urlBase = 'https://api.spotify.com/v1/';
  const urlToFetch = urlBase + url;
  const headers = new Headers({
     'Authorization': `Bearer ${this.getAccessToken()}`
   });
  const settings = {
    headers: headers
  };

  if (body) {
    settings.method = 'POST';
    settings.body = (Array.isArray(body)) ? JSON.stringify({uris:body}) : JSON.stringify({name:body});
  }

  const request = new Request(urlToFetch, settings);
  return request;
 },


 startFetch(request) {
   return fetch(request).then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error('Request failed!');
   }, networkError => console.log(networkError.message)
   )

 },

  search(term) {
    const request = this.request(`search?type=track&q=${term}`);
    return this.startFetch(request)
    .then(jsonResponse => {
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

  savePlaylist(name,uris) {
    let user_id = '';
    let playlist_id = '';

    if (!name || !uris.length) {
      return new Promise(resolve => resolve('you have to add tracks'));
    }

    const request = this.request('me');
    return this.startFetch(request).then(jsonResponse => {
      user_id = jsonResponse.id;
    }).then(() => {
      const urlToFetch = `users/${user_id}/playlists`;
      const request = this.request(urlToFetch,name);
      return this.startFetch(request).then(jsonResponse => {
        playlist_id = jsonResponse.id;
      }).then(() => {
        const urlToFetch = `users/${user_id}/playlists/${playlist_id}/tracks`;
        const request = this.request(urlToFetch,uris);
        return this.startFetch(request)
        .then(jsonResponse => {
          return jsonResponse;
        });
      });
    });
  }
}


 export default Spotify;
