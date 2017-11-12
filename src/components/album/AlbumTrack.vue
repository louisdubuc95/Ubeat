<template>
    <div :id="id" class="track pure-g">
        <div class="pure-u-md-1-24 pure-u-2-24">{{ (playlistData) ? playlistData.index + 1 : track.trackNumber }}</div>
        <div class="pure-u-md-2-24 pure-u-sm-4-24 pure-u-6-24">
            <a v-show="!playing" class="pure-button pure-button-play" @click="playAudio()"><i class="fa fa-play"></i></a>
            <a v-show="playing" class="pure-button pure-button-pause" @click="stopAudio()"><i class="fa fa-pause"></i></a>
            <a class="pure-button pure-button-add" @click="togglePlaylists()"><i class="fa fa-plus"></i></a>
        </div>
        <div :class="trackColumnSize">{{ track.trackName }}</div>
        <div v-if="playlistData" class="pure-u-md-4-24 pure-u-sm-6-24 pure-u-5-24 hidden-xs"><router-link :to="`/artist/${track.artistId}`">{{ track.artistName }}</router-link></div>
        <div v-if="playlistData" class="pure-u-md-5-24 pure-u-5-24 hidden-sm"><router-link :to="`/album/${track.collectionId}`">{{ track.collectionName }}</router-link></div>
        <div class="pure-u-md-2-24 pure-u-sm-2-24 pure-u-4-24">{{ track.trackTimeMinutes }}</div>
        <div v-if="playlistData" class="text-right pure-u-md-1-24 pure-u-2-24"><a class="pure-button pure-button-delete" @click="removeFromPlaylist()"><i class="fa fa-trash-o"></i></a></div>

        <audio :src="track.previewUrl" @pause="resetAudio()" @ended="stopAudio()"></audio>

        <div :class="{ active: trackPlaylistsActive }" class="playlists-selector">
            <ul>
                <li v-for="playlist in playlists" @click="addToPlaylist(playlist.id)">{{ playlist.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import PlaylistApi from '@/assets/PlaylistApi';

export default {
  name: 'album-track',
  props: {
    track: {
      type: Object,
      required: true
    },
    playlistData: {
      default: null,
      required: false
    }
  },
  data() {
    return {
      id: '',
      playlists: [],
      trackPlaylistsActive: false,
      trackColumnSize: 'pure-u-md-19-24 pure-u-sm-15-24 pure-u-12-24',
      audio: null,
      playing: false
    };
  },
  created() {
    this.track.trackTimeMinutes = this.toMinutes(this.track.trackTimeMillis);
    this.id = `track-${this.track.trackId}`;

    if (this.playlistData) {
      this.id += `-${this.playlistData.id}-${this.playlistData.index}`;
      this.trackColumnSize = 'pure-u-md-9-24 pure-u-sm-8-24 pure-u-9-24';
    }
  },
  mounted() {
    const root = document.getElementById(this.id);
    this.audio = root.getElementsByTagName('audio')[0];
  },
  methods: {
    playAudio() {
      this.audio.play();
      this.$emit('songPlaying', this.audio);
      this.playing = true;
    },
    stopAudio() {
      this.audio.pause();
      this.$emit('songStopped', null);
    },
    resetAudio() {
      this.audio.currentTime = 0;
      this.$emit('songStopped', this.audio);
      this.playing = false;
    },
    togglePlaylists() {
      this.trackPlaylistsActive = !this.trackPlaylistsActive;

      if (this.trackPlaylistsActive) {
        PlaylistApi.get()
          .then((playlists) => {
            this.playlists = playlists;
          });
      }
    },
    addToPlaylist(id) {
      PlaylistApi.addToPlaylist(id, this.track)
        .then(() => {
          this.togglePlaylists();
          this.$emit('trackAdded', id, this.track);
        });
    },
    removeFromPlaylist() {
      PlaylistApi.removeFromPlaylist(this.playlistData.id, this.track.trackId)
        .then(() => {
          this.$emit('trackRemoved', this.playlistData.index);
        });
    },
    toMinutes(millis) {
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }
  }
};
</script>

<style>
.track {
    position: relative;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
    padding: 15px 0;
    color: #FFF;
}

.track:first-child {
    padding-top: 0;
}

.track:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.track.track-header {
    text-transform: uppercase;
    font-size: 12px;
    color: rgba(255, 255, 255, .6);
}

.track a {
    color: #fff;
}

.track a:hover {
    text-decoration: underline;
}

.playlists-selector {
    display: none;
    position: absolute;
    z-index: 1;
    top: 60px;
    left: 0;
    overflow-y: auto;
    min-width: 250px;
    max-width: 300px;
    max-height: 200px;
    background-color: #f8f8f8;
    border-radius: 3px;
}

.playlists-selector ul {
    margin: 0;
    padding: 5px;
}

.playlists-selector ul li {
    padding: 10px;
    list-style-type: none;
    letter-spacing: normal;
    border-radius: 3px;
    margin-bottom: 5px;
    border: 1px solid #d3d3d3;
    background-color: white;
    color: #424242;
}

.playlists-selector ul li:last-child {
    margin-bottom: 0;
}

.playlists-selector ul li:hover {
    cursor: pointer;
    background-color: #d3d3d3;
}

.playlists-selector.active {
    display: block;
}
</style>
