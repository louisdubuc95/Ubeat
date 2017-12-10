import Vue from 'vue';
import UsersApi from './UsersApi';

export default class PlaylistsApi {
  static get() {
    return Vue.http.get('playlists', { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json());
  }

  static create(newName) {
    return Vue.http.post('playlists', { name: newName })
      .then(response => response.json());
  }

  static rename(id, newName) {
    return Vue.http.put(`playlists/${id}`, { name: newName });
  }

  static delete(id) {
    return Vue.http.delete(`playlists/${id}`);
  }

  static addToPlaylist(id, track) {
    return Vue.http.post(`playlists/${id}/tracks`, track);
  }

  static removeFromPlaylist(id, trackId) {
    return Vue.http.delete(`playlists/${id}/tracks/${trackId}`);
  }
}
