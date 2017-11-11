<template>
  <!-- https://github.com/vuejs/vue-loader/issues/384 vive le <div> obligatoire, que du bonheur ! -->
  <div class="rootElemPlaylist">
    <div class="pure-u-1-3 name_playlist" @click="toggleHidden();">
        {{this.namePlaylist}}
    </div>
    <div class="pure-u-1-3">
        <input type="text" placeholder="Renommer la playslist" v-model="nameRenommed" />
    </div>
    <div class="pure-u-1-6">
        <button @click="rename(nameRenommed)">Rename</button>
    </div>
    <div class="pure-u-1-6">
        <button @click="remove()">Supprimer</button>
    </div>
    <div class="pure-g" style="width: 100%;" v-if="!hidden">
      <div class="pure-u-1-6" style="float:left;">
        <div class="pure-u-1-2" style="float:left;"><a class="pure-button pure-button-add" v-on:click="addTrackTest()" title='Add song to playlist'><i class="fa fa-plus" ></i></a></div>
        <template v-if="tracks.length">
          <!-- mettre computed si :src ne bind pas idxTrackPlaying -->
            <audio 
              :id="id"
              :src="tracks[idxTrackPlaying] ? tracks[idxTrackPlaying].previewUrl : ''" 
              @ended="manageAudio();">
            </audio>
            <div class="pure-u-1-2" style="float:left;">
              <a v-if="isPlaying" v-on:click="pauseAudio();" class="pure-button pure-button-play">
                <i class="fa fa-pause" ></i>
              </a>
              <a v-else v-on:click="playAudio();" class="pure-button pure-button-pause" >
                <i class="fa fa-play" ></i>
              </a>
            </div>
        </template>
      </div>
      <div class="pure-u-5-6 tracks_list">
        <div @click="setTrackPlaying(track)" v-for="track in tracks">
          <song class="pure-g" :class="trackIsPlaying(track)" :key="track.trackId" :idPlaylist="id" :track="track"
          @removeTrack="removeTrack(track.trackId)">
          </song>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UBeatUnsecureAPI from '@/UBeatUnsecureAPI';
import Track from './Track';

export default {
  data: () => ({
    nameRenommed: '',
    hidden: false,
    isPlaying: false,
    idxTrackPlaying: 0,
    listenNextTrack: true,
    namePlaylist: this.name
  }),
  props: ['id', 'name', 'tracks'],
  components: {
    song: Track
  },
  methods: {
    toggleHidden() {
      this.hidden = !this.hidden;
    },
    nextTrackPlaying() {
      this.idxTrackPlaying += 1;
      if (!this.tracks.length || this.idxTrackPlaying >= this.tracks.length) {
        this.idxTrackPlaying = 0;
      }
    },
    trackIsPlaying(track) {
      return this.tracks.indexOf(track) === this.idxTrackPlaying ? 'active' : '';
    },
    setTrackPlaying(track) {
      const idx = this.tracks.indexOf(track);

      if (idx === this.idxTrackPlaying) {
        return;
      }
      this.pauseAudio();
      this.idxTrackPlaying = idx;
    },
    manageAudio() {
      if (this.listenNextTrack) {
        this.nextTrackPlaying();
      }
      this.pauseAudio();
    },
    pauseAudio() {
      document.getElementById(this.id).pause();
      this.isPlaying = false;
    },
    playAudio() {
      document.getElementById(this.id).play();
      this.isPlaying = true;
    },
    rename(newName) {
      UBeatUnsecureAPI.changePlaylistName(this.id, newName)
        .then((res) => {
          this.namePlaylist = !res.name ? 'Not name...' : res.name;
        }/* , function (rej) { */

          // https://eslint.org/docs/rules/no-console, c'était volontaire enfin bon.. no problem yaura pas de log
          // console.log('Impossible de changer le nom de la tâche, err: ', rej);
        /* } */);
    },
    addTrack() {
      /* perso je comprend pas comment l'utilisateur peut ajouter des chansons valide..
          il doit renseigner idTrack ? (Puisque les filtre de recherche sont à la livrable 3) */
    },
    addTrackTest() {
      const track = {
        trackId: 325479,
        wrapperType: 'track',
        kind: 'song',
        artistId: 116851,
        collectionId: 325483,
        artistName: 'Blink-182',
        collectionName: 'Enema of the State',
        trackName: 'Dumpweed',
        collectionCensoredName: 'Enema of the State',
        trackCensoredName: 'Dumpweed',
        artistViewUrl: 'https://itunes.apple.com/us/artist/blink-182/id116851?uo=4',
        collectionViewUrl: 'https://itunes.apple.com/us/album/dumpweed/id325483?i=325479&uo=4',
        trackViewUrl: 'https://itunes.apple.com/us/album/dumpweed/id325483?i=325479&uo=4',
        previewUrl: 'http://a816.phobos.apple.com/us/r1000/118/Music/e6/86/40/mzm.xhlwhbtm.aac.p.m4a',
        artworkUrl30: 'http://a1.mzstatic.com/us/r30/Features/cb/72/0e/dj.aoonomrr.30x30-50.jpg',
        artworkUrl60: 'http://a3.mzstatic.com/us/r30/Features/cb/72/0e/dj.aoonomrr.60x60-50.jpg',
        artworkUrl100: 'http://a2.mzstatic.com/us/r30/Features/cb/72/0e/dj.aoonomrr.100x100-75.jpg',
        collectionPrice: 9.99,
        trackPrice: 1.29,
        releaseDate: '1999-05-25T07:00:00Z',
        collectionExplicitness: 'explicit',
        trackExplicitness: 'explicit',
        discCount: 1,
        discNumber: 1,
        trackCount: 12,
        trackNumber: 1,
        trackTimeMillis: 143862,
        country: 'USA',
        currency: 'USD',
        primaryGenreName: 'Alternative',
        contentAdvisoryRating: 'Explicit',
        radioStationUrl: 'https://itunes.apple.com/station/idra.325479'
      };

      UBeatUnsecureAPI.addTrack(this.id, track)
        .then(() => {
          // une playlist peut avoir plusieurs fois la même track..
          // (difficile de chercher le trackId dans le résultat si la track y été déjà..)
          // l'ajout est OK
          this.tracks.push(track);
        });
    },
    /* supprime une chanson */
    removeTrack(trackId) {
      UBeatUnsecureAPI.removeTrackFromPlaylist(this.id, trackId)
      .then(() => {
        for (let i = 0; i < this.tracks.length; i += 1) {
          if (this.tracks[i].trackId === trackId) {
            if (i === this.idxTrackPlaying) {
              this.pauseAudio();
            }
            if (!this.tracks.length || this.idxTrackPlaying >= this.tracks.length) {
              this.idxTrackPlaying = 0;
            }
            this.tracks.splice(i, 1);
            break;
          }
        }
      });
    },
    remove() {
      this.$emit('removePlaylist', this.id);
    }
  },
  created() {
    /* Ca n'arrivera jamais dans cette livrable
    if (!name)
        // la playlist n'a pas été chargé en amont,
        // il faut faire une requête GET /playlists/:id pour chercher son @name
    */
  }
};
</script>

<style>
.rootElemPlaylist > div {
    float: left;
}

.rootElemPlaylist .name_playlist:hover {
    cursor: pointer;
}

</style>