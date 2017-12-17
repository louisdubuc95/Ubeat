import Vue from 'vue';
import UsersApi from './UsersApi';

export default class SearchApi {

  static global(query, limit = 10) {
    return Vue.http.get(`search?q=${query}&limit=${limit}`,
        { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized);
  }

  static users(query, limit = 10) {
    return Vue.http.get(`search/users?q=${query}&limit=${limit}`,
        { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized);
  }

  static albums(query, limit = 10) {
    return Vue.http.get(`search/albums?q=${query}&limit=${limit}`,
        { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized);
  }

  static artists(query, limit = 10) {
    return Vue.http.get(`search/artists?q=${query}&limit=${limit}`,
        { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized);
  }

  static tracks(query, limit = 10) {
    return Vue.http.get(`search/tracks?q=${query}&limit=${limit}`,
        { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized);
  }
}
