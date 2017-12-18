<template>
    <main id="playlists">
        <section class="header">
            <div class="container">
                <h1>Browse playlists</h1>
                <search-input :typeSearch="'tracks'"></search-input>
            </div>
        </section>
        <section class="content">
            <div id="playlists-create">
                <div class="container">
                    <form @submit.prevent="createPlaylist()">
                        <input type="text" class="pure-input" v-model="playlistName" placeholder="Choose a name" />
                        <input type="submit" class="pure-button pure-button-primary" value="Create a new playlist" />
                    </form>
                </div>
            </div>
            <div id="playlists-container">
                <div class="container">
                    <playlist
                        v-for="playlist in playlists"
                        :key="playlist.id"
                        :playlist="playlist"
                        :editable="ownedPlaylist(playlist.owner)"
                        @playlistDeleted="onPlaylistDeleted"
                        @trackAdded="onTrackAdded"
                        @songPlaying="onSongPlaying"
                        @songStopped="onSongStopped"></playlist>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import UsersApi from '@/assets/UsersApi';
import PlaylistApi from '@/assets/PlaylistApi';
import Playlist from './Playlist';
import SearchInput from '../search/SearchInput';

export default {
  name: 'playlists',
  components: {
    SearchInput,
    Playlist
  },
  data() {
    return {
      playlists: [],
      playlistName: '',
      audio: null
    };
  },
  created() {
    UsersApi.getTokenInfo(this.$cookie.get('token'))
      .then((user) => {
        this.authenticatedUser = user.id;

        PlaylistApi.get()
          .then((playlists) => {
            this.playlists = playlists;
          });
      });
  },
  methods: {
    createPlaylist() {
      if (this.playlistName) {
        PlaylistApi.create(this.playlistName)
          .then((newPlaylist) => {
            this.playlists.push(newPlaylist);
            this.playlistName = '';
          });
      }
    },
    ownedPlaylist(owner) {
      if (owner && owner.id && owner.id === this.authenticatedUser) {
        return true;
      }
      return false;
    },
    onPlaylistDeleted(id) {
      for (let i = 0; i < this.playlists.length; i += 1) {
        if (this.playlists[i].id === id) {
          this.playlists.splice(i, 1);
          return;
        }
      }
    },
    onTrackAdded(id, track) {
      for (let i = 0; i < this.playlists.length; i += 1) {
        if (this.playlists[i].id === id) {
          this.playlists[i].tracks.push(track);
          return;
        }
      }
    },
    onSongPlaying(audio) {
      if (this.audio) {
        this.audio.pause();
      }
      this.audio = audio;
    },
    onSongStopped(audio) {
      if (this.audio === audio) {
        this.audio = null;
      }
    }
  }
};
</script>

<style>
#playlists #playlists-create .pure-input,
#playlists #playlists-create .pure-button {
    width: 100%;
}

#playlists #playlists-create .pure-input {
    margin-bottom: 10px;
}

#playlists #playlists-container {
    padding-top: 20px;
}

@media screen and (min-width: 35.5em) {

    #playlists #playlists-create .pure-input {
        width: 300px;
        margin-bottom: 0;
    }

    #playlists #playlists-create .pure-button {
        width: 250px;
    }

}
</style>
