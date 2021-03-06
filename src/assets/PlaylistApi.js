import Vue from 'vue';
import UsersApi from './UsersApi';

export default class PlaylistsApi {
  static get() {
    return Vue.http.get('playlists', { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized);
  }

  static create(newName) {
    return Vue.http.post('playlists',
    { name: newName },
    { headers: { authorization: UsersApi.getToken() } })
      .then(response => response.json(), UsersApi.unauthorized);
  }

  static rename(id, newName) {
    return Vue.http.put(`playlists/${id}`,
    { name: newName },
    { headers: { authorization: UsersApi.getToken() } });
  }

  static delete(id) {
    return Vue.http.delete(`playlists/${id}`, { headers: { authorization: UsersApi.getToken() } });
  }

  static addToPlaylist(id, track) {
    return Vue.http.post(`playlists/${id}/tracks`,
    track,
    { headers: { authorization: UsersApi.getToken() } });
  }

  static removeFromPlaylist(id, trackId) {
    return Vue.http.delete(`playlists/${id}/tracks/${trackId}`, { headers: { authorization: UsersApi.getToken() } });
  }
}
