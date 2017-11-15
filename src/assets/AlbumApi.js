import Vue from 'vue';

export default class AlbumApi {
  static get(id) {
    return Vue.http.get(`albums/${id}`)
      .then(response => response.json())
      .then(response => response.results[0]);
  }

  static getTracks(id) {
    return Vue.http.get(`albums/${id}/tracks`)
      .then(response => response.json())
      .then(response => response.results);
  }
}
