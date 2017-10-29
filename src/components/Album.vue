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
                        <p><span>Release date :</span> 2010</p>
                        <p><span>Tracks :</span> 12</p>
                        <p><span>Genre :</span> Pop</p>
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
                  <audio
                      :id="item.number"
                      :src="item.link"></audio>
                    <div class="pure-u-2-24"><a class="pure-button pure-button-play" :id="['a-' + item.number]" v-on:click="manageAudio(item.number)"><i class="fa fa-play" :id="['i-' + item.number]">                    </i></a></div>
                    <div class="pure-u-2-24">  {{ item.number }}  </div>
                    <div class="pure-u-17-24">  {{ item.title }} </div>
                    <div class="pure-u-3-24">  {{ item.length }} </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>

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
    };
  },

  mounted() {

  },

  methods: {

    manageAudio(number) {
      if (!this.infoAlbum[number].isPlaying) {
        this.infoAlbum[number].isPlaying = true;
        this.play(number);
      } else {
        this.infoAlbum[number].isPlaying = false;
        this.pause(number);
      }
    },

    play(number) {
      document.getElementById(number).play();
      this.swapClasses(number, 'pause');
    },

    pause(number) {
      document.getElementById(number).pause();
      this.swapClasses(number, 'play');
    },

    swapClasses(number, whatAdd) {
      if (whatAdd === 'pause') {
        document.getElementById(`a-${number}`).classList.add('pure-button-pause');
        document.getElementById(`a-${number}`).classList.remove('pure-button-play');
        document.getElementById(`i-${number}`).classList.add('fa-pause');
        document.getElementById(`i-${number}`).classList.remove('fa-play');
      } else {
        document.getElementById(`a-${number}`).classList.add('pure-button-play');
        document.getElementById(`a-${number}`).classList.remove('pure-button-pause');
        document.getElementById(`i-${number}`).classList.add('fa-play');
        document.getElementById(`i-${number}`).classList.remove('fa-pause');
      }
    }
  }
};
</script>
