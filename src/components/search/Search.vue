<template>
    <main id="search">
      <section class="header">
        <div class="container">
          <h1> Search Results : {{ this.$route.query.global }}</h1>
        </div>
      </section>
      <section class="content">
          <div class="container">
              <div class="albums" v-if="albums.length">
                  <h3>Albums</h3>
                  <div class="pure-g">
                      <div class="artist-album pure-u-lg-1-5 pure-u-md-1-3 pure-u-sm-1-2 pure-u-1" v-for="album in albums">
                      <router-link :to="`/album/${album.collectionId}`">
                          <img class="pure-img" :src="album.artworkUrl100" />
                          <h4>{{ album.collectionName }}</h4>
                      </router-link>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="content">
          <div class="container">
              <div class="artists" v-if="artists.length">
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
      <section class="content">
          <div class="container">
              <div class="tracks" v-if="tracks.length">
                  <h3>Tracks</h3>
                  <album-track
                    v-for="track in tracks"
                    :key="track.trackId"
                    :track="track"
                    @songPlaying="onSongPlaying"
                    @songStopped="onSongStopped">
                  </album-track>
              </div>
          </div>
      </section>
      <section class="content">
          <div class="container">
              <div class="users" v-if="users.length">
                  <h3>Users</h3>
                  <div class="pure-g">
                      <div v-for="user in users" class="user">
                        {{ user.name }}
                        {{ user.email }}
                        <i class="fa fa-user-plus fa-2x" id="add-user" @click="followUser(user.id)"></i>
                        <i class="fa fa-user-times fa-2x" id="not-user" @click="stopFollowUser(user.id)"></i>
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
      // correspondance entre le wrapperType de l'API et des tableaux de this.data
            // apparament la recherche globale ne permet pas de trouver des utilisateurs..
            //    je met quand met la correspondance user: users
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
    // RQ: recherche de limit = 10 par défault
    // recherche globale
    if (this.$route.query.global !== undefined) {
      this.handleRep(SearchApi.global(this.$route.query.global), 'global');
    } else { // recherche par album/artist/track/user
      if (this.$route.query.albums !== undefined) {
        this.handleRep(SearchApi.albums(this.$route.query.albums), 'albums');
      }
      if (this.$route.query.artists !== undefined) {
        this.handleRep(SearchApi.artists(this.$route.query.artists), 'artists');
      }
      if (this.$route.query.tracks !== undefined) {
        this.handleRep(SearchApi.tracks(this.$route.query.tracks), 'tracks');
      }
      if (this.$route.query.users !== undefined) {
        this.handleRep(SearchApi.users(this.$route.query.users), 'users');
      }
    }
  },
  mounted() {
  },
  methods: {
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
    },
    stopFollowUser(userId) {
      UsersApi.getTokenInfo(this.$cookie.get('token'))
      .then((response) => {
        if (response.id === userId) {
          UsersApi.stopFollow(userId)
          .then((e) => {
            // eslint-disable-next-line
            console.log(e);
          })
          .catch((e) => {
            // eslint-disable-next-line
            console.err(e);
          });
        }
      });
    }
  }
};
</script>

<style>
#search {
  margin-top: 50px;
}
#search .users {
  max-width: 600px;
  padding: 5px;
  text-align: right;
}
#search .header h1 {
  color: #FFF;
  padding: 0 0 15px 0;
  font-size: 4rem;
  font-weight: normal;
  border-bottom: 1px solid rgba(255, 255, 255, .3);
}
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
#search #add-user, #search #not-user {
    margin-left: 20px;
    color: #000;
}
#search #add-user:hover, #search #not-user:hover {
  color: white;
}

#search #add-user:active, #search #not-user:active {
  color: #0b0bbb;
}

#search .user {
  background-color: #d0d0d0;
  border-radius: 4px;
  margin-top: 20px;
}

 #search .icon-result {
   color: #ffffff;
   margin: 10px 0px 10px 5px;
 }
</style>
