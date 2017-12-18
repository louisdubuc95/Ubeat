<template>
    <main id="search">
      <section class="header">
        <div class="container">
            <h1>Results for : {{ this.$route.query.q }}</h1>
        </div>
      </section>
      <section class="content" v-if="albums.length">
          <div class="container">
              <div class="albums">
                  <h3>Albums</h3>
                  <div class="pure-g">
                      <div class="artist-album pure-u-lg-1-5 pure-u-md-1-3 pure-u-sm-1-2 pure-u-1" v-for="album in albums">
                      <router-link :to="`/album/${album.collectionId}`">
                          <img class="pure-img" :src="album.artworkUrl100.replace('100x100', '300x300')" />
                          <h4>{{ album.collectionName }}</h4>
                      </router-link>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="content" v-if="artists.length">
          <div class="container">
              <div class="artists">
                  <h3>Artist</h3>
                  <div class="pure-g">
                      <div class="artist-album pure-u-lg-1-5 pure-u-md-1-3 pure-u-sm-1-2 pure-u-1" v-for="artist in artists">
                          <router-link :to="`/artist/${artist.artistId}`">
                            <h4>{{ artist.artistName }}</h4>
                            <h4>{{ artist.primaryGenreName }}</h4>
                            <a :href="artist.artistLinkUrl" class="apple-music"></a>
                          </router-link>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="content" v-if="tracks.length">
          <div class="container">
              <div class="tracks">
                  <h3>Tracks</h3>
                  <album-track
                    v-for="(track, index) in tracks"
                    :key="track.trackId"
                    :editable="false"
                    :playlistData="{ index: index }"
                    :track="track"
                    @songPlaying="onSongPlaying"
                    @songStopped="onSongStopped">
                  </album-track>
              </div>
          </div>
      </section>
      <section class="content" v-if="users.length">
          <div class="container">
              <div class="users">
                  <h3>Users</h3>
                  <div id="users-container" class="pure-g">
                      <div v-for="user in users" class="user-container pure-u-1 pure-u-sm-12-24 pure-u-lg-6-24">
                          <div class="user">
                              <p><router-link :to="{ path: '/profile/' + user.id }">{{ user.name }}</router-link></p>
                              <p>{{ user.email }}</p>
                              <p><a class="follow" @click="followUser(user.id)">Follow this user</a></p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </main>
</template>

<script>

import UsersApi from '@/assets/UsersApi';
import SearchApi from '@/assets/SearchApi';
import AlbumTrack from '../album/AlbumTrack';

export default {
  name: 'Search',
  components: {
    AlbumTrack
  },
  data() {
    return {
      albums: [],
      artists: [],
      tracks: [],
      users: [],
      typesResult: {
        collection: 'albums',
        artist: 'artists',
        track: 'tracks',
        user: 'users',
        image: '',
      }
    };
  },
  created() {
    this.search(this.$route.query.mode, this.$route.query.q);
  },
  beforeRouteUpdate(to, from, next) {
    this.search(to.query.mode, to.query.q);
    next();
  },
  methods: {
    search(mode, query) {
      this.albums = [];
      this.artists = [];
      this.tracks = [];
      this.users = [];

      switch (mode) {
        case 'global':
          this.handleRep(SearchApi.users(query), 'users');
          this.handleRep(SearchApi.global(query), 'global');
          break;
        case 'albums':
          this.handleRep(SearchApi.albums(query), 'albums');
          break;
        case 'artists':
          this.handleRep(SearchApi.artists(query), 'artists');
          break;
        case 'tracks':
          this.handleRep(SearchApi.tracks(query), 'tracks');
          break;
        case 'users':
          this.handleRep(SearchApi.users(query), 'users');
          break;
        default:
      }
    },
    handleRep(promise, searchMethod) {
      promise.then((res) => {
        let results;
        let typeResult = searchMethod;

        if (searchMethod === 'users') {
          results = res;
        } else {
          results = res.results;
        }
        for (let i = 0; i < results.length; i += 1) {
          if (searchMethod === 'global') {
            typeResult = this.typesResult[results[i].wrapperType];
          }
          this[typeResult].push(results[i]);
        }
      });
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
    followUser(userId) {
      UsersApi.getTokenInfo(this.$cookie.get('token'))
      .then((response) => {
        if (response.id !== userId) {
          UsersApi.follow(userId);
        }
      });
    }
  }
};
</script>

<style>
#search .content h3 {
  margin-top: 0;
  color: #fff;
}

#search .content .artist-album {
  padding: 30px 10px;
  box-sizing: border-box;
  text-align: center;
}

#search .content .artist-album a {
  text-decoration: none;
}

#search .content .artist-album img {
  margin: auto;
}

#search .content .artist-album h4 {
  font-size: 14px;
  font-weight: normal;
  color: #FFF;
}

#search #artist-bio {
  color: #000;
  white-space: pre-wrap;
}

#search #users-container {
    margin-left: -10px;
    margin-right: -10px;
}

#search .user-container {
    padding: 10px;
    box-sizing: border-box;
}

#search .user {
    padding: 10px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, .5);
}

#search .user p,
#search .user p a {
  color: #fff;
}

#search .user p a:hover {
  text-decoration: underline;
  cursor: pointer;
}

#search .user .follow {
    font-size: 11px;
}

#search .icon-result {
   color: #ffffff;
   margin: 10px 0px 10px 5px;
 }
</style>
