import Vue from 'vue';
import UsersApi from './UsersApi';

export default class ArtistApi {
  static get(id) {
    return Vue.http.get(`artists/${id}`, { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized)
      .then(response => response.results[0]);
  }

  static getAlbums(id) {
    return Vue.http.get(`artists/${id}/albums`, { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized)
      .then(response => response.results);
  }

  static getMore(name) {
    return Vue.http.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=923b6ee93d08364b910129468fc2a024&format=json`)
      .then((response) => {
        const artist = response.body.artist;

        if (artist.name === 'Undefined') {
          return {
            biography: 'Biography not found for this artist',
            image: '/static/images/unknownArtist.png'
          };
        }

        return {
          biography: `${artist.bio.content.substr(0, 400)}...`,
          image: artist.image[5]['#text']
        };
      });
  }
}
