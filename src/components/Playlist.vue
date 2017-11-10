<template>
  <!-- https://github.com/vuejs/vue-loader/issues/384 vive le <div> obligatoire, que du bonheur ! -->
  <div id="rootElemPlaylist" class="pure-u-1-1">
    <div class="pure-u-1-3 name_playlist" @click="toggleSee()">
        {{this.name}}
    </div>
    <div class="pure-u-1-3">
        <input type="text" placeholder="Renommer la playslist" v-model="nameRenommed" />
    </div>
    <div class="pure-u-1-6">
        <button @click="rename(nameRenommed)">Rename</button>
    </div>
    <div class="pure-u-1-6">
        <button @click="rename(nameRenommed)">Supprimer</button>
    </div>
    <div class="pure-g" v-for="track in tracks" style="clear:left;" v-if="see">
      <!-- <div class="pure-u-2-24"><a class="pure-button pure-button-add" v-on:click="addSongToPlayList(item.number)" title='Add song to playlist'><i class="fa fa-plus" ></i></a></div> -->
      <audio 
        :src="tracksPlaying.link"
        @ended="setPlayings(false)"></audio>
        <!-- v-if="!item.isPlaying" -->
        <!-- v-on:click="manageAudio(item.number)" -->

        <!-- v-if="item.isPlaying" -->
      <!-- v-on:click="manageAudio(item.number)" -->
      <song class="pure-g" style="clear:left;" :key="track.trackId" :idPlaylist="id" :track="track"
        @removeTrack="removeTrack(track.trackId)" >  
      </song>
    </div>
  </div>
</template>

<script>
import UBeatUnsecureAPI from '@/UBeatUnsecureAPI';
import Track from './Track';

export default {
  data: () => ({
    nameRenommed: '',
    see: false,
    trackPlaying: []
  }),
  props: ['id', 'name', 'tracks'],
  components: {
    song: Track
  },
  methods: {
    toggleSee() {
      this.see = !this.see;
    },
    rename(newName) {
      UBeatUnsecureAPI.changePlaylistName(this.id, newName)
        .then((res) => {
          this.name = !res.name ? 'Not name...' : res.name;
        }/* , function (rej) { */

          // https://eslint.org/docs/rules/no-console, c'était volontaire enfin bon.. no problem yaura pas de log
          // console.log('Impossible de changer le nom de la tâche, err: ', rej);
        /* } */);
    },
    addTrack() {
      /* perso je comprend pas comment l'utilisateur peut ajouter des chansons valide..
          il doit renseigner idTrack ? (Puisque les filtre de recherche sont à la livrable 3) */
    },
    addTrackTest(track) {
      UBeatUnsecureAPI.addTrack(this.id, track)
        .then(() => {
          debugger;
          // c'est là où ça me manque le
          //    (void)res du C ou le res = res du C pour enlever le flag de -Wextra..
          // fortunately eslint is smarter otherwise it would be a lot less fun for me :)

          // une playlist peut avoir plusieurs fois la même track..
          // (difficile de chercher le trackId dans le résultat si la track y été déjà..)
          // l'ajout est OK
          this.tracks.push(track);
        }/* , (rej) => { */
          // alright too no log for you !
        /* } */);
    },
    /* supprime une chanson, et la retourne en bonus */
    // http://eslint.org/docs/rules/no-plusplus  gg tout ce que j'aime, maybe create a new language ?
    removeTrack(trackId) {
      for (let i = 0; i < this.tracks.length; i += 1) {
        if (this.tracks[i].trackId === trackId) {
          return (this.tracks.splice(i, 1))[0];
        }
      }
      return null;
    }
  },
  created() {
    /* Ca n'arrivera jamais dans cette livrable
    if (!name)
        // la playlist n'a pas été chargé en amont,
        // il faut faire une requête GET /playlists/:id pour chercher son @name
    */
    /* this.addTrackTest(
      {
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
      }
    ); */
  }
};
</script>

<style>
#rootElemPlaylist > div {
    float: left;
}

.name_playlist:hover {
    cursor: pointer;
}
</style>