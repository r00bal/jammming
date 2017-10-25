
const token = 'USER_TOKEN';

 const Spotify = {
   getAccessToken() {
     if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
   }
 }

 export default Spotify;
