<template>
    <main id="album">
        <section id="album-infos">
            <div class="pure-g container">
                <div id="album-cover" class="pure-u-sm-1-4 pure-u-1">
                    <img class="pure-img" src="/static/images/artists/black-eyed-peas/albums/the-beginning.jpeg" />
                </div>
                <div id="album-text" class="pure-u-sm-3-4 pure-u-1">
                    <h1>The Beginning</h1>
                    <h2><router-link to="/artist" id="album-group">The Black Eyed Peas</router-link></h2>

                    <div class="album-specs">
                        <p><span>Release date :</span> {{ releaseDate }} </p>
                        <p><span>Tracks :</span> {{ tracks }} </p>
                        <p><span>Genre :</span> {{ genre }} </p>
                        <p><a href="https://geo.itunes.apple.com/ca/album/the-beginning-deluxe-version/id403881301?mt=1&app=music" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a></p>
                    </div>
                </div>
            </div>
        </section>
        <section id="album-tracks">
            <div class="container">
                <div id="album-track-header" class=" album-track pure-g">
                    <div class="pure-u-2-24"></div>
                    <div class="pure-u-2-24">#</div>
                    <div class="pure-u-17-24">Title</div>
                    <div class="pure-u-3-24">Length</div>
                </div>

                <div class="album-track pure-g" v-for="item in infoAlbum">
                  <div class="pure-u-2-24"><a class="pure-button pure-button-add" v-on:click="addSongToPlayList(item.number)" title='Add song to playlist'><i class="fa fa-plus" ></i></a></div>
                  <audio
                      :id="item.number"
                      :src="item.link"></audio>
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


export default {
  data() {
    return {
      infoAlbum: [
        { number: '1', title: 'The Time (Dirty Bit)', length: '5:07', link: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/00/03/29/mzm.lofaqvzx.aac.ep.m4a', isPlaying: false },
        { number: '2', title: 'Light Up The Night', length: '4:21', link: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/ab/da/02/mzm.ahfimrgt.aac.ep.m4a', isPlaying: false },
        { number: '3', title: 'Love You Long Time', length: '3:45', link: '', isPlaying: false },
        { number: '4', title: 'XOXOXO', length: '3:45', link: '', isPlaying: false },
        { number: '5', title: 'Someday', length: '4:33', link: '', isPlaying: false },
        { number: '6', title: 'Whenever', length: '3:16', link: '', isPlaying: false },
        { number: '7', title: 'Fashion Beats', length: '5:20', link: '', isPlaying: false },
        { number: '8', title: 'Don\'t Stop The Party', length: '6:07', link: '', isPlaying: false },
        { number: '9', title: 'Do It Like This', length: '5:29', link: '', isPlaying: false },
        { number: '10', title: 'The Best One Yet (The Boy)', length: '4:25', link: '', isPlaying: false },
        { number: '11', title: 'Just Can\'t Get Enough', length: '3:39', link: '', isPlaying: false },
        { number: '12', title: 'Play It Loud', length: '4:21', link: '', isPlaying: false },
      ],

      id: '403881301',
      releaseDate: '2010-11-03',
      tracks: 12,
      genre: 'Pop',

    };
  },
  mounted() {

  },

  methods: {

    addSongToPlayList(number) {
      return number;
    },

    manageAudio(number) {
      if (!this.infoAlbum[number - 1].isPlaying) {
        this.infoAlbum[number - 1].isPlaying = true;
        this.play(number);
      } else {
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


  }
};

const baseUrl = 'http://ubeat.herokuapp.com/unsecure';

export const getAlbumId = albumid => (
  fetch(`${baseUrl}albums/${albumid}`)
    .then((response) => {
      const x = response.json();
      return x;
    })
    .catch(() => {
      console.error('unable to fetch tasks');
    })
);
export const getTracksAlbumId = albumid => (
  fetch(`${baseUrl}albums/${albumid}/Tracks`)
    .then((response) => {
      const x = response.json();
      return x;
    })
    .catch(() => {
      console.error('unable to fetch tasks');
    })
);
</script>
