<template>
    <div :id="id" class="playlist">
        <div class="playlist-header pure-g">
            <div class="pure-u-md-1-24 pure-u-sm-2-24 pure-u-3-24"><a v-show="editable" class="pure-button pure-button-edit" @click="renamePlaylist()"><i class="fa fa-pencil"></i></a></div>
            <div class="pure-u-md-19-24 pure-u-sm-16-24 pure-u-11-24">
                <h4 v-show="!renamingPlaylist" @click="toggleTracks()">{{ playlist.name }}</h4>
                <input v-show="renamingPlaylist" v-model="newName" type="text" class="pure-input" @keyup.enter="submitPlaylistName()" @keyup.esc="renamePlaylist()" />
            </div>
            <div class="pure-u-md-3-24 pure-u-sm-4-24 pure-u-8-24">{{ playlist.tracks.length }} song{{ (playlist.tracks.length !== 1) ? 's' : '' }}</div>
            <div class="text-right pure-u-md-1-24 pure-u-2-24"><a v-show="editable" class="pure-button pure-button-delete" @click="deletePlaylist()"><i class="fa fa-trash-o"></i></a></div>
        </div>

        <div v-show="displayTracks" class="playlist-tracks">
            <div class="track track-header pure-g">
                <div class="pure-u-md-3-24 pure-u-sm-6-24 pure-u-8-24">#</div>
                <div class="pure-u-md-9-24 pure-u-sm-8-24 pure-u-9-24">Title</div>
                <div class="pure-u-md-4-24 pure-u-6-24 hidden-xs">Artist</div>
                <div class="pure-u-md-5-24 pure-u-5-24 hidden-sm">Album</div>
                <div class="pure-u-md-3-24 pure-u-sm-4-24 pure-u-7-24">Length</div>
            </div>

            <album-track
                v-for="(track, index) in playlist.tracks"
                :key="track.trackId"
                :track="track"
                :editable="editable"
                :playlistData="{ id: playlist.id, index: index }"
                @trackAdded="onTrackAdded"
                @trackRemoved="onTrackRemoved"
                @songPlaying="onSongPlaying"
                @songStopped="onSongStopped"></album-track>
        </div>
    </div>
</template>

<script>
import PlaylistApi from '@/assets/PlaylistApi';
import AlbumTrack from '../album/AlbumTrack';

export default {
  name: 'playlist',
  props: {
    playlist: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  components: {
    AlbumTrack
  },
  data: () => ({
    id: '',
    displayTracks: false,
    renamingPlaylist: false,
    newName: ''
  }),
  created() {
    this.id = `playlist-${this.playlist.id}`;
    this.newName = this.playlist.name;
  },
  methods: {
    toggleTracks() {
      if (this.playlist.tracks.length) {
        this.displayTracks = !this.displayTracks;
      }
    },
    deletePlaylist() {
      PlaylistApi.delete(this.playlist.id)
        .then(() => {
          this.$emit('playlistDeleted', this.playlist.id);
        });
    },
    renamePlaylist() {
      this.renamingPlaylist = !this.renamingPlaylist;
    },
    submitPlaylistName() {
      if (this.newName) {
        PlaylistApi.rename(this.playlist.id, this.newName)
          .then(() => {
            this.playlist.name = this.newName;
            this.renamePlaylist();
          });
      }
    },
    onTrackAdded(id, track) {
      this.$emit('trackAdded', id, track);
    },
    onTrackRemoved(index) {
      if (this.playlist.tracks.length === 1) {
        this.toggleTracks();
      }
      this.playlist.tracks.splice(index, 1);
    },
    onSongPlaying(audio) {
      this.$emit('songPlaying', audio);
    },
    onSongStopped(audio) {
      this.$emit('songStopped', audio);
    }
  }
};
</script>

<style>
.playlist {
    margin-bottom: 10px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 3px;
    color: #fff;
}

.playlist:last-child {
    margin-bottom: 0;
}

.playlist .playlist-header {
    align-items: center;
    padding: 20px;
}

.playlist .playlist-header h4 {
    margin: 0;
}

.playlist .playlist-header h4:hover {
    cursor: pointer;
}

.playlist .playlist-tracks {
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 3px;
}
</style>
