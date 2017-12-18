<template>
    <main id="album">
        <section class="header">
            <div class="pure-g container">
                <div id="album-cover" class="pure-u-sm-1-6 pure-u-1">
                    <img class="pure-img" :src="album.artworkUrl100" />
                </div>
                <div id="album-text" class="pure-u-sm-5-6 pure-u-1">
                    <h1>{{ album.collectionName }} <a :href="album.collectionViewUrl" class="apple-music"></a></h1>
                    <h2><router-link :to="`/artist/${album.artistId}`">{{ album.artistName }}</router-link></h2>

                    <div id="album-specs">
                        <p><span>Release date :</span> {{ album.releaseDate }}</p>
                        <p><span>Tracks :</span> {{ album.trackCount }}</p>
                        <p><span>Genre :</span> {{ album.primaryGenreName }}</p>
                        <p><a class="pure-button pure-button-primary" @click="togglePlaylists()">Add to playlist</a></p>
                        <search-input :typeSearch="'albums'"></search-input>
                        <div :class="{ active: playlistsActive }" class="playlists-selector">
                            <ul>
                                <li v-for="playlist in playlists" @click="addToPlaylist(playlist.id)">{{ playlist.name }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="content">
            <div class="container">
                <div class="track track-header pure-g">
                    <div class="pure-u-md-3-24 pure-u-sm-6-24 pure-u-8-24">#</div>
                    <div class="pure-u-md-19-24 pure-u-sm-15-24 pure-u-12-24">Title</div>
                    <div class="pure-u-md-2-24 pure-u-sm-2-24 pure-u-4-24">Length</div>
                </div>

                <album-track
                    v-for="track in tracks"
                    :key="track.trackId"
                    :track="track"
                    @songPlaying="onSongPlaying"
                    @songStopped="onSongStopped"></album-track>
            </div>
        </section>
    </main>
</template>

<script>
import PlaylistApi from '@/assets/PlaylistApi';
import AlbumApi from '@/assets/AlbumApi';
import SearchInput from '../search/SearchInput';
import AlbumTrack from './AlbumTrack';

export default {
  name: 'Album',
  components: {
    SearchInput,
    AlbumTrack
  },
  data() {
    return {
      album: {},
      tracks: [],
      playlists: [],
      playlistsActive: false,
      audio: null
    };
  },
  created() {
    AlbumApi.get(this.$route.params.id)
      .then((album) => {
        this.album = album;
        this.album.artworkUrl100 = this.album.artworkUrl100.replace('100x100', '300x300');
        this.album.releaseDate = this.album.releaseDate.substr(0, 10);
      });
    AlbumApi.getTracks(this.$route.params.id)
      .then((tracks) => {
        this.tracks = tracks;
      });
  },
  methods: {
    togglePlaylists() {
      this.playlistsActive = !this.playlistsActive;

      if (this.playlistsActive) {
        PlaylistApi.get()
          .then((playlists) => {
            this.playlists = playlists;
          });
      }
    },
    addToPlaylist(id) {
      for (let i = 0; i < this.tracks.length; i += 1) {
        PlaylistApi.addToPlaylist(id, this.tracks[i]);
      }
      this.togglePlaylists();
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
#album .header #album-cover img {
    width: 100%;
    margin: auto;
}

#album .header #album-text {
    color: #fff;
    box-sizing: border-box;
}

#album .header #album-text h1 {
    font-size: 4rem;
    font-weight: normal;
    margin: 0;
}

#album .header #album-text h2 a {
    font-weight: normal;
    color: #fff;
}

#album .header #album-text h2 a:hover {
    text-decoration: underline;
}

#album .header #album-text #album-specs {
    position: relative;
}

#album .header .playlists-selector {
    width: 100%;
    top: 160px;
    left: 0;
}

@media screen and (min-width: 35.5em) {

    #album .header #album-cover img {
        margin: 0;
    }

    #album .header #album-text {
        padding-left: 30px;
    }

}

@media screen and (min-width: 48em) {

    #album .header .playlists-selector {
        top: 105px;
        left: 200px;
    }

}
</style>
