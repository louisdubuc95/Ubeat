<template>
  <div id="rootElementPlaylists">
    <div class="pure-g">
        <div class="pure-u-1-3">
            <input id="namePlaylistInput" name="namePlaylist" placeholder="Name of the new playlist"/>
        </div>
        <div class="pure-u-1-3">
            <input id="nameOwnerInput" name="nameOwner" placeholder="Your Email"/>
        </div>
        <div class="pure-u-1-3">
            <button v-on:click="addPlaylist()">Add Playlist</button>
        </div>
    </div>
    <div class="pure-g playlist_header">
        <div class="pure-u-1-1">Name</div>
    </div>
    <div v-for="playlist in playlists" class="playlist_list">
      <playlist :id="playlist.id" :name="playlist.name" :tracks="playlist.tracks" class="pure-g playlist" @removePlaylist="removePlaylist(playlist.id);">
      </playlist>
    </div>
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
          name: !tmp.name ? 'Not name...' : tmp.name,
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

      getJsonPromise(Vue.http.post(`${UBeatUnsecureAPI.url}/playlists`, { name: namePlaylist, owner: nameOwner }))
      .then((response) => {
        this.playlists.push({
          id: response.id,
          name: response.name,
          tracks: response.tracks
        });
      }); // End Then
    },
    removePlaylist(idPlaylist) {
      UBeatUnsecureAPI.removePlaylist(idPlaylist)
      .then(() => {
        for (let i = 0; i < this.playlists.length; i += 1) {
          if (this.playlists[i].id === idPlaylist) {
            this.playlists.splice(i, 1);
            break;
          }
        }
      });
    }
  } // End Methods
};
</script>

<style>
#rootElementPlaylists {
    margin-top: 5em;
    margin-left: 1em;
    margin-right: 1em;
    color: white;
  }

  #rootElementPlaylists button {
    margin-left: 1em;
    background-color: #008CBA;
    border: none;
  }

  #rootElementPlaylists .playlist_list {
    list-style: none;
  }

  #rootElementPlaylists .playlist {
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
    padding: 15px 0;
    color: #FFF;
  }

  #rootElementPlaylists .playlist:hover {
    background: rgba(255, 255, 255, 0.5);
    color: black;
  }

  #rootElementPlaylists td {
    width: 20em;
  }

  #rootElementPlaylists .playlist_header {
    font-weight: bold;
    color: white;
    font-size: 22px;
    margin-top: 20px;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
  }

  #rootElementPlaylists input {
    color: black;
  }
</style>
