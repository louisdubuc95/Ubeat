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
      .then(response => response.body.artist);
  }
}
