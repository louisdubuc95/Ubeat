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
}
