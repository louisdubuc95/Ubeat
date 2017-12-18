<template>
    <main id="profile">
        <section class="header">
            <div class="container">
                <h1>User profile</h1>

                <div class="pure-g">
                    <div class="pure-u-10-24 pure-u-sm-6-24 pure-u-md-4-24 pure-u-lg-2-24">
                        <img class="pure-img" :src="user.image" />
                    </div>
                    <div class="pure-u-14-24 pure-u-md-18-24 pure-u-md-20-24 pure-u-lg-22-24">
                        <p>{{ user.name }}</p>
                        <p>{{ user.email }}</p>
                        <p v-if="authenticatedUser != user.id">
                            <a id="follow" class="pure-button pure-button-primary" @click="follow()">Follow user</a>
                        </p>
                        <search-input :typeSearch="'users'"></search-input>
                    </div>
                </div>
            </div>
        </section>

        <section class="content">
            <div class="container">
                <h3>Playlists</h3>
                <div id="playlists-container">
                    <playlist
                        v-for="playlist in playlists"
                        v-if="ownedPlaylist(playlist.owner)"
                        :key="playlist.id"
                        :editable="authenticatedUser === user.id"
                        :playlist="playlist"
                        @playlistDeleted="onPlaylistDeleted"
                        @trackAdded="onTrackAdded"
                        @songPlaying="onSongPlaying"
                        @songStopped="onSongStopped"></playlist>
                </div>

                <h3>Followed users</h3>
                <div id="friends-container" class="pure-g">
                    <div v-for="followed in user.following" class="pure-u-1 pure-u-sm-12-24 pure-u-lg-6-24 friend-container">
                        <div class="pure-g friend">
                            <div class="pure-u-8-24">
                                <img :src="followed.image" class="pure-img"/>
                            </div>
                            <div class="pure-u-16-24">
                              <p><router-link :to="{ path: '/profile/' + followed._id }" class="friends-links">{{ followed.name }}</router-link></p>
                              <p><a class="unfollow" @click="unfollow(followed._id)">Unfollow this user</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import PlaylistApi from '@/assets/PlaylistApi';
import GravatarApi from '@/assets/GravatarApi';
import UsersApi from '@/assets/UsersApi';
import Playlist from '../playlists/Playlist';
import SearchInput from '../search/SearchInput';

export default {
  name: 'Profile',
  components: {
    SearchInput,
    Playlist
  },
  data() {
    return {
      audio: null,
      user: {},
      playlists: [],
      playlistName: '',
      authenticatedUser: 0
    };
  },
  created() {
    this.fetchUser(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUser(to.params.id);
    next();
  },
  methods: {
    fetchUser(id) {
      UsersApi.getTokenInfo(this.$cookie.get('token'))
        .then((user) => {
          this.authenticatedUser = user.id;

          PlaylistApi.get().then((playlists) => {
            this.playlists = playlists;
          });
        });

      UsersApi.getUser(id)
      .then((user) => {
        this.user = user;

        GravatarApi.getAvatar(this.user.email)
          .then((image) => {
            if (image !== undefined) {
              this.user.image = image;
            } else {
              this.user.image = '/static/images/randomGuy.png';
            }
          })
          .catch(() => {
            this.user.image = '/static/images/randomGuy.png';
          });

        for (let i = 0; i < this.user.following.length; i += 1) {
          GravatarApi.getAvatar(this.user.following[i].email)
          .then((image) => {
            if (image !== undefined) {
              this.user.following[i].image = image;
            } else {
              this.user.following[i].image = '/static/images/randomGuy.png';
            }
          })
          .catch(() => {
            this.user.following[i].image = '/static/images/randomGuy.png';
          });
        }
      });
    },
    ownedPlaylist(owner) {
      if (owner && owner.name && owner.name === this.user.name) {
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
    },
    follow() {
      UsersApi.follow(this.user.id)
        .then(() => {
          document.getElementById('follow').setAttribute('disabled', 'disabled');
          document.getElementById('follow').innerHTML = 'Followed!';
        });
    },
    unfollow(id) {
      UsersApi.stopFollow(id)
        .then((response) => {
          this.user.following = response.following;
        });
    }
  }
};
</script>

<style>
#profile {
    color: #fff;
}

#profile .header h1 {
    margin-bottom: 25px;
}

#profile .content h3 {
    margin-top: 0;
}

#profile #playlists-container {
    margin-bottom: 25px;
}

#profile #friends-container {
    margin-left: -10px;
    margin-right: -10px;
}

#profile .friend-container {
    padding: 10px;
    box-sizing: border-box;
}

#profile .friend {
    padding: 10px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, .5);
}

#profile .friend img {
    display: block;
}

#profile .friend p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
}

#profile .friend p,
#profile .friend a {
    color: #fff;
}

#profile .friend a:hover {
  text-decoration: underline;
  cursor: pointer;
}

#profile .friend .unfollow {
  font-size: 11px;
}
</style>
