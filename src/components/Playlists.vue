<template>
  <div id="rootElementPlaylists">
    <div>
      <input id="namePlaylistInput" name="namePlaylist" placeholder="Name of the new playlist"/>
      <input id="nameOwnerInput" name="nameOwner" placeholder="Your Email"/>
      <button v-on:click="addPlaylist()">Add Playlist</button>
    </div>
    <ul id="list">
      <li v-for='playlist in playlists'>
        <playlist :id="playlist.id" :name="playlist.name" :tracks="playlist.tracks"></playlist>
      </li>
    </ul>
    <div id="test"></div>
  </div>
</template>

<script>

import Vue from 'vue';

import UBeatUnsecureAPI, { getJsonPromise } from '@/UBeatUnsecureAPI';
import Playlist from './Playlist';

export default {
  data() {
    return {
      playlists: []
    };
  },
  created() {
    getJsonPromise(Vue.http.get(`${UBeatUnsecureAPI.url}/playlists`)).then((response) => {
      for (let i = 0; i < response.length; i += 1) {
        const tmp = response[i];
        this.playlists.push({
          id: tmp.id,
          name: tmp.name,
          tracks: tmp.tracks
        });
      }
    });
  },
  components: {
    playlist: Playlist
  },
  methods: {
    addPlaylist() {
      const namePlaylist = document.getElementById('namePlaylistInput').value;
      const nameOwner = document.getElementById('nameOwnerInput').value;

      Vue.http.post(`${UBeatUnsecureAPI.url}/playlists`, { name: namePlaylist, owner: nameOwner }).then(response =>
        (new Promise((resolve, reject) => {
          let ret;
          try {
            ret = response.json();
          } catch (e) {
            reject(e);
          }
          resolve(ret);
        })) // End Promise
      ); // End Then
    } // end addPlaylist
  } // End Methods
};
</script>

<style>
  #rootElementPlaylists {
    margin-top: 5em;
  }
  ul {
    list-style: none;
  }

  li {
    margin: 1em;
  }
</style>
