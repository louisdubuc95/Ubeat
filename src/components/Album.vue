<template>
    <main id="album">
        <section id="album-infos">
            <div class="pure-g container">
                <div id="album-cover" class="pure-u-sm-1-4 pure-u-1">
                    <br />
                    <img class="pure-img" :src='informationAlbum.artworkUrl100'/>
                </div>
                <div id="album-text" class="pure-u-sm-3-4 pure-u-1">
                    <h1>{{informationAlbum.collectionName}}</h1>
                    <h2><router-link to="/artist" id="album-group">{{informationAlbum.artistName}}</router-link></h2>

                    <div class="album-specs">
                        <p><span>Release date :</span> {{releaseDate}} </p>
                        <p><span>Tracks :</span> {{ informationAlbum.trackCount }} </p>
                        <p><span>Genre :</span> {{ informationAlbum.primaryGenreName }} </p>
                        <p><a :href='informationAlbum.collectionViewUrl' style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a></p>
                        <div class="pure-menu pure-menu-horizontal">
                          <ul class="pure-menu-list">
                            <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                              <a href="#" id="menuLink1" class="pure-menu-link" title='Add Album to Playlist'>Add album to playlist</a>
                              <ul class="pure-menu-children">
                                <div v-for="item in playlists">
                                  <li class="pure-menu-item">
                                    <a href="#" class="pure-menu-link" v-on:click="addAlbumToPlaylist()"> {{ item.name }} {{ item.id }} </a>
                                  </li>
                                </div>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                  </div>
                </div>
            </section>
            <section id="album-tracks">
              <div class="container">
                  <div id="album-track-header" class=" album-track pure-g">
                      <div class="pure-u-4-24"></div>
                      <div class="pure-u-2-24">#</div>
                      <div class="pure-u-15-24">Title</div>
                      <div class="pure-u-3-24">Length</div>
                  </div>

                  <div class="album-track pure-g" v-for="item in infoAlbum">
                    <div class="pure-u-2-24"><a class="pure-button pure-button-add" v-on:click="addSongToPlayList(item.number)" title='Add song to playlist'><i class="fa fa-plus" ></i></a></div>
                    <audio
                      :id="item.number"
                      :src="item.link"
                      @ended="setPlayings(false)"></audio>
                    <div class="pure-u-2-24" v-if="!item.isPlaying"><a class="pure-button pure-button-play" v-on:click="manageAudio(item.number)"><i class="fa fa-play" >                    </i></a></div>
                    <div class="pure-u-2-24" v-if="item.isPlaying"><a class="pure-button pure-button-pause" v-on:click="manageAudio(item.number)"><i class="fa fa-pause" >                    </i></a></div>
                    <div class="pure-u-2-24">  {{ item.number }}  </div>
                    <div class="pure-u-15-24">  {{ item.title }} </div>
                    <div class="pure-u-3-24">  {{ item.length }} </div>
                  </div>
              </div>
            </section>
      </main>
</template>


<script>

import UBeatUnsecureAPI from '@/UBeatUnsecureAPI';
import JSOperation from '@/JSOperation';

export default {
  data() {
    return {
      informationAlbum: {},
      playASong: false,
      infoAlbum: [],
      infotrack: {},
      releaseDate: '',
      wrapperType: '',
      kind: '',
      artistId: 0,
      collectionId: 0,
      trackId: 0,
      artistName: '',
      collectionName: '',
      trackName: '',
      collectionCensoredName: '',
      trackCensoredName: '',
      artistViewUrl: '',
      collectionViewUrl: '',
      trackViewUrl: '',
      previewUrl: '',
      artworkUrl30: '',
      artworkUrl60: '',
      artworkUrl100: '',
      collectionPrice: 0,
      trackPrice: 0,
      collectionExplicitness: '',
      trackExplicitness: '',
      discCount: 0,
      discNumber: 0,
      trackCount: 0,
      trackNumber: 0,
      trackTimeMillis: 0,
      country: '',
      currency: '',
      primaryGenreName: '',
      contentAdvisoryRating: '',
      radioStationUrl: '',
      playlists: [],
    };
  },
  created() {
    UBeatUnsecureAPI.getalbumById(this.$route.params.id)
      .then((json) => {
        this.informationAlbum = json.results[0];
        this.releaseDate = JSOperation.setreleasedate(json.results[0].releaseDate);
      });
    UBeatUnsecureAPI.getalbumTracksById(this.$route.params.id)
      .then((json) => {
        for (let x = 0; x < json.results.length; x += 1) {
          this.infoAlbum.push({
            number: json.results[x].trackNumber,
            title: json.results[x].trackName,
            length: JSOperation.setmillistominute(json.results[x].trackTimeMillis),
            link: json.results[x].previewUrl,
            isPlaying: false,

            wrapperType: json.results[x].wrapperType,
            kind: json.results[x].kind,
            artistId: json.results[x].artistId,
            collectionId: json.results[x].collectionId,
            trackId: json.results[x].trackId,
            artistName: json.results[x].artistName,
            collectionName: json.results[x].collectionName,
            trackName: json.results[x].trackName,
            collectionCensoredName: json.results[x].collectionCensoredName,
            trackCensoredName: json.results[x].trackCensoredName,
            artistViewUrl: json.results[x].artistViewUrl,
            collectionViewUrl: json.results[x].collectionViewUrl,
            trackViewUrl: json.results[x].trackViewUrl,
            previewUrl: json.results[x].previewUrl,
            artworkUrl30: json.results[x].artworkUrl30,
            artworkUrl60: json.results[x].artworkUrl60,
            artworkUrl100: json.results[x].artworkUrl100,
            collectionPrice: json.results[x].collectionPrice,
            trackPrice: json.results[x].trackPrice,
            releaseDate: json.results[x].releaseDate,
            collectionExplicitness: json.results[x].collectionExplicitness,
            trackExplicitness: json.results[x].trackExplicitness,
            discCount: json.results[x].discCount,
            discNumber: json.results[x].discNumber,
            trackCount: json.results[x].trackCount,
            trackNumber: json.results[x].trackNumber,
            trackTimeMillis: json.results[x].trackTimeMillis,
            country: json.results[x].country,
            currency: json.results[x].currency,
            primaryGenreName: json.results[x].primaryGenreName,
            contentAdvisoryRating: json.results[x].contentAdvisoryRating,
            radioStationUrl: json.results[x].radioStationUrl,

          });
        }
      });
    UBeatUnsecureAPI.getPlaylists(this.$route.params.id)
        .then((json) => {
          for (let i = 0; i < json.length; i += 1) {
            if (json[i].name) {
              console.log(`${json[i].id} ${json[i].name}`);
              this.playlists[i] = { id: json[i].id, name: json[i].name };
            }
          }
        });
  },
  methods: {
    addSongToPlayList(number) {
      const idPlaylist = '5a062ec0cde6210004b47620';
      const trackData = {
        wrapperType: this.infoAlbum[number].wrapperType,
        kind: this.infoAlbum[number].kind,
        artistId: this.infoAlbum[number].artistId,
        collectionId: this.infoAlbum[number].collectionId,
        trackId: this.infoAlbum[number].trackId,
        artistName: this.infoAlbum[number].artistName,
        collectionName: this.infoAlbum[number].collectionName,
        trackName: this.infoAlbum[number].trackName,
        collectionCensoredName: this.infoAlbum[number].collectionCensoredName,
        trackCensoredName: this.infoAlbum[number].trackCensoredName,
        artistViewUrl: this.infoAlbum[number].artistViewUrl,
        collectionViewUrl: this.infoAlbum[number].collectionViewUrl,
        trackViewUrl: this.infoAlbum[number].trackViewUrl,
        previewUrl: this.infoAlbum[number].previewUrl,
        artworkUrl30: this.infoAlbum[number].artworkUrl30,
        artworkUrl60: this.infoAlbum[number].artworkUrl60,
        artworkUrl100: this.infoAlbum[number].artworkUrl100,
        collectionPrice: this.infoAlbum[number].collectionPrice,
        releaseDate: this.infoAlbum[number].releaseDate,
        trackPrice: this.infoAlbum[number].trackPrice,
        collectionExplicitness: this.infoAlbum[number].collectionExplicitness,
        trackExplicitness: this.infoAlbum[number].trackExplicitness,
        discCount: this.infoAlbum[number].discCount,
        discNumber: this.infoAlbum[number].discNumber,
        trackCount: this.infoAlbum[number].trackCount,
        trackNumber: this.infoAlbum[number].trackNumber,
        trackTimeMillis: this.infoAlbum[number].trackTimeMillis,
        country: this.infoAlbum[number].country,
        currency: this.infoAlbum[number].currency,
        primaryGenreName: this.infoAlbum[number].primaryGenreName,
        contentAdvisoryRating: this.infoAlbum[number].contentAdvisoryRating,
        radioStationUrl: this.infoAlbum[number].radioStationUrl,
      };

      UBeatUnsecureAPI.addTrack(idPlaylist, trackData)
        .then();
    },
    addAlbumToPlaylist() {
      for (let i = 0; i < this.infoAlbum.length; i += 1) {
        this.addSongToPlayList(i);
      }
    },
    manageAudio(number) {
      if (!this.infoAlbum[number - 1].isPlaying && !this.playASong) {
        this.infoAlbum[number - 1].isPlaying = true;
        this.playASong = true;
        this.play(number);
      } else if (this.infoAlbum[number - 1].isPlaying) {
        this.playASong = false;
        this.infoAlbum[number - 1].isPlaying = false;
        this.pause(number);
      }
    },
    pause(number) {
      document.getElementById(number).pause();
    },

    play(number) {
      document.getElementById(number).play();
    },

    getAlbumByID(id) {
      UBeatUnsecureAPI.albumByID(id)
        .then();
    },
    setPlayings(isPlayed) {
      this.playASong = false;
      for (let i = 0; i < this.infoAlbum.length; i += 1) {
        this.infoAlbum[i].isPlaying = isPlayed;
      }
    }
  }
};
</script>
