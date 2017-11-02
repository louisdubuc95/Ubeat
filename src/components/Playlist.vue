<template>
  <!-- https://github.com/vuejs/vue-loader/issues/384 vive le <div> obligatoire, que du bonheur ! -->
  <div>
    <input type="text" placeholder="Renommer la playslist" v-model="nameRenommed" /><button @click="rename(nameRenommed)"></button>
    <track v-for="track in tracks" :idPlaylist="id" :id="track.id" :taskData="track.data"
        @removeTrack="removeTrack(track.id)"></track>
  </div>
</template>

<script>
import UBeatUnsecureAPI from '@/UBeatUnsecureAPI';

export default {
  data: () => ({
    id_test: '59fa5789b692160004967fb1', // a supp
    nameRenommed: '',
    tracks: [] // initialisé dans created, contient tous les data d'une tâche
  }),
  props: ['id', 'name'],
  methods: {
    rename(newName) {
      UBeatUnsecureAPI.changePlaylistName(this.id, newName)
        // apparement eslint ne connait pas les fonction anonyme
        // np we can fix it by making the code even more disgusting :)
        .then(function uselessNameOfFonction(res) {
          this.name = res.name;
        }/* , function (rej) { */

          // https://eslint.org/docs/rules/no-console, c'était volontaire enfin bon.. no problem yaura pas de log
          // console.log('Impossible de changer le nom de la tâche, err: ', rej);
        /* } */);
    },
    addTrack() {
      /* perso je comprend pas comment l'utilisateur peut ajouter des chansons valide..
          il doit renseigner idTrack ? (Puisque les filtre de recherche sont à la livrable 3) */
    },
    addTrackTest(trackId, trackData) {
      UBeatUnsecureAPI.addTrack(this.id_test, trackId, trackData)
        .then(/* (res) => { */
          // c'est là où ça me manque le
          //    (void)res du C ou le res = res du C pour enlever le flag de -Wextra..
          // fortunately eslint is smarter otherwise it would be a lot less fun for me :)

          // alright
        /* }, */ /* (rej) => { */
          // alright too no log for you !
        /* } */);
    },
    /* supprime une chanson, et la retourne en bonus */
    // http://eslint.org/docs/rules/no-plusplus  gg tout ce que j'aime, maybe create a new language ?
    removeTrack(trackId) {
      for (let i = 0; i < this.tracks.length; i += 1) {
        if (this.tracks[i].id === trackId) {
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
    this.addTrackTest(
      325479,
      {
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
    );
  }
};
</script>