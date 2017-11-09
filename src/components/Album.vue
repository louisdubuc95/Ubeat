<template>
    <main id="album">
        <section id="album-infos">
            <div class="pure-g container">
                <div id="album-cover" class="pure-u-sm-1-4 pure-u-1">
                    <img class="pure-img" :src='albumimg'/>
                </div>
                <div id="album-text" class="pure-u-sm-3-4 pure-u-1">
                    <h1>{{albumname}}</h1>
                    <h2><router-link to="/artist" id="album-group">{{artistname}}</router-link></h2>

                    <div class="album-specs">
                        <p><span>Release date :</span> {{releaseDate}} </p>
                        <p><span>Tracks :</span> {{ tracks }} </p>
                        <p><span>Genre :</span> {{ genre }} </p>
                        <p><a :href='lienItune' style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a></p>
                        <p><a class="pure-button pure-button-primary" v-on:click="addAlbumToPlayList()" title='Add Album to Playlist'>Add Album</a></p>
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
      albumimg: '',
      albumname: '',
      artistname: '',
      genre: '',
      id: '1223592280',
      playASong: false,
      infoAlbum: [],
      lienItune: '',
      releaseDate: '',
      tracks: 0,
    };
  },
  beforeCreated: {},
  created() {
    UBeatUnsecureAPI.getalbumById(this.id)
      .then((json) => {
        this.releaseDate = JSOperation.setreleasedate(json.results[0].releaseDate);
        this.tracks = json.results[0].trackCount;
        this.genre = json.results[0].primaryGenreName;
        this.artistname = json.results[0].artistName;
        this.albumname = json.results[0].collectionName;
        this.albumimg = json.results[0].artworkUrl100;
        this.lienItune = json.results[0].collectionViewUrl;
      });
    UBeatUnsecureAPI.getalbumTracksById(this.id)
      .then((json) => {
        for (let x = 0; x < json.results.length; x += 1) {
          this.infoAlbum.push({
            number: json.results[x].trackNumber,
            title: json.results[x].trackName,
            length: JSOperation.setmillistominute(json.results[x].trackTimeMillis),
            link: json.results[x].previewUrl,
            isPlaying: false
          });
        }
      });
  },
  methods: {
    addSongToPlayList(number) {
      return number;
    },
    addAlbumToPlaylist() {
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
    millisToMinutesAndSeconds(num) {
      const seconds = Math.floor(num / 1000);
      const minutes = Math.floor(seconds / 60);
      const seconds2 = seconds - (minutes * 60);
      const format = `${minutes}:${seconds2}`;
      return format;
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
