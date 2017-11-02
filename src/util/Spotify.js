import {Secret} from './Secret.js';

let accessToken;
const CLIENT_ID = Secret.ID;
const REDIRECT_URI = "http://localhost:3000/";

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


   request(url, body) {
    const urlBase = 'https://api.spotify.com/v1/';
    const urlToFetch = urlBase + url;
    const headers = new Headers({
       'Authorization': `Bearer ${this.getAccessToken()}`
     });
    const myInit = {
      headers: headers
    };
    if (body) {
      console.log(body);
      myInit.method = 'POST';
      myInit.body = (Array.isArray(body)) ? JSON.stringify({uris:body}) : JSON.stringify({name:body});
    }
    console.log(Array.isArray(body));
    console.log(myInit);
    const request = new Request(urlToFetch, myInit);
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

  savePlaylist(playlistName,trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }
    const headers = {
      'Authorization': `Bearer ${this.getAccessToken()}`
      }
    const request = this.request('me')
console.log(accessToken);
    let user_id = '';
    let playlist_id = '';
    return this.startFetch(request)
    .then(jsonResponse => {
        console.log(jsonResponse);
        user_id = jsonResponse.id;

        const request2 = this.request(`users/${user_id}/playlists`,playlistName);
      //   const urlToFetch = `https://api.spotify.com/v1/users/${user_id}/playlists`;
      //   console.log(urlToFetch);
      //   return fetch(urlToFetch, {
      //     headers: headers,
      //     method: 'POST',
      //     body: JSON.stringify({name:playlistName})
      //   }).then(resposne => {
      //     if (resposne.ok) {
      //       return resposne.json();
      //     }
      //     throw new Error('Request failed!');
      //   }, networkError => console.log(networkError.message)
      // )
      return this.startFetch(request2)
      .then(jsonResponse => {
        console.log(jsonResponse);
        return playlist_id = jsonResponse.id;
        console.log(trackUris);
       console.log(playlist_id);
     }).then(() => {
        const request3 = this.request(`users/${user_id}/playlists/${playlist_id}/tracks`,trackUris);
        return this.startFetch(request3)
    //    const urlToFetch = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;
    //    console.log(urlToFetch);
    //    const myInit = {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify({uris:trackUris})
    //   };
    //   console.log(myInit);
    //     return fetch(urlToFetch, myInit).then(resposne => {
    //      console.log(resposne);
    //    }, networkError => console.log(networkError.message)
    //  )

     .then(jsonResponse => {
       console.log(jsonResponse);

    });
     });
      });
    }
  }


 export default Spotify;
