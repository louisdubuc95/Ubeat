<template>
    <main id="profile">
        <section class="header">
            <div class="container">
              <h4>{{ userName }}</h4>
              <h4>{{ email }}</h4>
              <img :src="image" />
            </div>
        </section>
        <section class="content">
            <div id="playlists-container">
                <div class="container">
                    <playlist
                        v-for="playlist in playlists"
                        :key="playlist.id"
                        :playlist="playlist"
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
import PlaylistApi from '@/assets/PlaylistApi';
import GravatarApi from '@/assets/GravatarApi';
import Playlist from './Playlist';

export default {
  name: 'Profile',
  components: {
    Playlist
  },
  data() {
    return {
      audio: null,
      email: 'equipe00011@gmail.com',
      image: '',
      playlists: [],
      playlistName: '',
      userName: 'Alexandre',
    };
  },
  created() {
      // UserSearchApi.get(this.$route.params.id)
      //   .then((user) => {
      //     this.userName = user.name;
      //     this.email = user.email;
      //   });
  },
  mounted() {
    PlaylistApi.get()
      .then((playlists) => {
        const start = playlists;

        for (let i = 0; i < start.length; i += 1) {
          if (start[i].owner !== undefined &&
              start[i].owner.name !== undefined &&
              start[i].owner.name !== '' &&
              start[i].owner.name === this.userName) {
            this.playlists.push(start[i]);
          }
        }
      });
    GravatarApi.getAvatar(this.email)
      .then((image) => {
        if (image !== undefined) {
          this.image = image;
        }
      });
  },
  methods: {
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
#profile #playlists #playlists-container {
    padding-top: 20px;
}

#profile  .header h1 {
    color: #FFF;
    padding: 0 0 15px 0;
    font-size: 4rem;
    font-weight: normal;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
}

#profile .header {
    color: rgba(255, 255, 255, .4);
}

#profile .content h3 {
    margin-top: 0;
    color: #fff;
}

#profile .content {
    padding: 30px 10px;
    box-sizing: border-box;
    text-align: center;
}

#profile .content a {
    text-decoration: none;/* eslint-disable */
}

#profile .content img {
    margin: auto;
}

#profile .content h4 {
    font-size: 14px;
    font-weight: normal;
    color: #FFF;
}
</style>
