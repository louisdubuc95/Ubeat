<template>
    <main id="profile">
        <section class="header">
            <search-input :typeSearch="'users'"></search-input>
            <div class="container">
              <h4>{{ userName }}</h4>
              <h4>{{ email }}</h4>
              <img :src="image" />
              <i class="fa fa-user-plus fa-2x" id="add-user" @click="followUser()"></i>
              <i class="fa fa-user-times fa-2x" id="not-user" @click="stopFollowUser()"></i>
            </div>
        </section>
        <section class="content">
            <h3 v-if="following.length > 0"> Friend(s) </h3>
            <div id="following-section">
              <div v-for="user in following" class="friends-container">
                <router-link v-bind:to="{path: '/profile/' + user._id}"
                             class="friends-links">
                  <span><img v-bind:src="user.image" class="friend-image"/></span>
                  <span>
                    <p> {{ user.name }} </p>
                    <p> {{ user.email }} </p>
                  </span>
                </router-link>
              </div>
            </div>
            <div id="playlists-container">
                <h3 v-if="playlists.length > 0"> Playlists </h3>
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
import UsersApi from '@/assets/UsersApi';
import Playlist from './Playlist';
import SearchInput from '../searchInput/SearchInput';

export default {
  name: 'Profile',
  components: {
    SearchInput,
    Playlist
  },
  data() {
    return {
      audio: null,
      email: '',
      following: [],
      image: '',
      playlists: [],
      playlistName: '',
      userName: '',
    };
  },
  created() {
    UsersApi.getUser(this.$route.params.id)
    .then((user) => {
      this.userName = user.name;
      this.email = user.email;
      this.following = user.following;
      GravatarApi.getAvatar(this.email)
        .then((image) => {
          if (image !== undefined) {
            this.image = image;
          }
        })
        .catch(() => {
          this.image = '/static/images/randomGuy.png';
        });
      for (let i = 0; i < this.following.length; i += 1) {
        GravatarApi.getAvatar(this.following[i].email)
        .then((image) => {
          if (image !== undefined) {
            this.following[i].image = image;
          } else {
            this.following[i].image = '/static/images/randomGuy.png';
          }
        })
        .catch(() => {
          this.following[i].image = '/static/images/randomGuy.png';
        });
      }
    });
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
    },
    followUser() {
      let userId;
      UsersApi.getTokenInfo(this.$cookie.get('token'))
      .then((response) => {
        userId = response.id;
        if (userId !== this.$route.params.id) {
          UsersApi.follow(this.$route.params.id);
        }
      });
    },
    stopFollowUser() {
      let userId;
      UsersApi.getTokenInfo(this.$cookie.get('token'))
      .then((response) => {
        userId = response.id;
        if (userId === this.$route.params.id) {
          UsersApi.stopFollow(this.$route.params.id)
          .then((e) => {
            console.log(e);
          })
          .catch((e) => {
            console.err(e);
          });
        }
      });
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

#profile .header, .friends-container {
    color: rgba(255, 255, 255, .4);
}

#profile .content h3 {
    margin-top: 0;
    color: #fff;
}

#profile .content {
    paddi3ng: 30px 10px;
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

#profile #add-user, #profile #not-user {
    margin-left: 20px;
}

#profile .friends-container {
  background-color: #dddddd;
  border-radius: 3px;
  color: black;
  margin-bottom: 7px;
  max-width: 500px;
  padding: 3px;
  text-align: left;
  width: 100%;
}

#profile .friends-links {
  color: black;
}

#profile #add-user:hover, #profile #not-user:hover {
  color: white;
}

#profile #add-user:active, #profile #not-user:active {
  color: #0b0bbb;
}
</style>
