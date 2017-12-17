import Vue from 'vue';
import UsersApi from './UsersApi';

export default class AlbumApi {
  static get(id) {
    return Vue.http.get(`albums/${id}`, { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized)
      .then(response => response.results[0]);
  }

  static getTracks(id) {
    return Vue.http.get(`albums/${id}/tracks`, { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized)
      .then(response => response.results);
  }
}
