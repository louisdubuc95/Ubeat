import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);


// vive eslint.. @@@@@!

function getJsonPromise(promise) {
  return promise
    .then(res =>
      (new Promise((resolve, reject) => {
        let ret;

        try {
          ret = res.json();
        } catch (e) {
          reject(e); // invalid json format
        }
        resolve(ret);
      }))
    );
}

export default class UBeatUnsecureAPI {
  static get url() { return 'http://ubeat.herokuapp.com/unsecure'; }

  static changePlaylistName(idPlaylist, name) {
    return getJsonPromise(Vue.http.put(`${UBeatUnsecureAPI.url}/playlists/${idPlaylist}`,
      {
        name, // vive le eslint..
        owner: 'thisFieldIsUseless@or.what'
      })
      );
  }

  static removeTrackFromPlaylist(idPlaylist, idTrack) {
    return getJsonPromise(Vue.http.delete(`${UBeatUnsecureAPI.url}/playlists/${idPlaylist}/tracks/${idTrack}`));
  }

  static addTrack(idPlaylist, idTrack, trackData) {
    const d = Object.assign(trackData, { trackId: idTrack });

    return getJsonPromise(Vue.http.post(`${UBeatUnsecureAPI.url}/playlists/${idPlaylist}/tracks`, d)
      );
  }
}
