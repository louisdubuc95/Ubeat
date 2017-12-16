<template>
    <main id="search">
      <div class="albums" v-if="albums.length">
        ALBUMS
        <div v-for="album in albums">
          <router-link :to="`/album/${album.collectionId}`">
            <img class="pure-img" :src="album.artworkUrl60" />
            {{ album.collectionName }}
          </router-link>
        </div>
      </div>
      <div class="artists" v-if="artists.length">
        ARTISTS
        <div v-for="artist in artists">
          <router-link :to="`/artist/${artist.artistId}`">
            {{ artist.artistName }}
            {{ artist.primaryGenreName }}
            <a :href="artist.artistLinkUrl" class="apple-music"></a>
          </router-link>
        </div>
      </div>
      <div class="tracks" v-if="tracks.length">
        TRACKS
        <album-track
          v-for="track in tracks"
          :key="track.trackId"
          :track="track"
          @songPlaying="onSongPlaying"
          @songStopped="onSongStopped">
        </album-track>
      </div>
      <div class="users" v-if="users.length">
        USERS
        <div v-for="user in users">
          {{ user.name }}
          {{ user.email }}
          <i class="fa fa-user-plus fa-2x" id="add-user" @click="followUser(user.id)"></i>
          <i class="fa fa-user-times fa-2x" id="not-user" @click="stopFollowUser(user.id)"></i>
        </div>
      </div>
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
        user: 'users'
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
</style>
