import Vue from 'vue';

export default class ArtistApi {
  static get(id) {
    return Vue.http.get(`artists/${id}`)
      .then(response => response.json())
      .then(response => response.results[0]);
  }

  static getAlbums(id) {
    return Vue.http.get(`artists/${id}/albums`)
      .then(response => response.json())
      .then(response => response.results);
  }
}
