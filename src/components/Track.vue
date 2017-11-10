<template>
  <div id="rootElemTrack" class="pure-u-1-1">
  <!-- <audio
        :id="item.number"
        :src="item.link"
        @ended="setPlayings(false)"></audio> -->
        <!-- v-if="!item.isPlaying" -->
        <!-- v-on:click="manageAudio(item.number)" -->

        <!-- v-if="item.isPlaying" -->
      <!-- v-on:click="manageAudio(item.number)" -->
      <!-- <div class="pure-u-2-24">
        <a class="pure-button pure-button-play">
          <i class="fa fa-play" ></i>
        </a>
      </div>
      
      <div class="pure-u-2-24">
        <a class="pure-button pure-button-pause" >
          <i class="fa fa-pause" ></i>
        </a>
      </div> -->
      <div class="pure-u-8-24">
        {{ track.trackName }}
      </div>
      <div class="pure-u-8-24">
        {{ track.artistName }}
      </div>
      <div class="pure-u-5-24">
        {{ track.collectionName }}
      </div>
      <div class="pure-u-3-24">
        {{ time }}
      </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      time: ''
    }),
    props: ['idPlaylist', 'track'],
    methods: {
      convertToMin(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        let tmp = '';
        if (seconds < 10) {
          tmp = 0;
        }
        return `${minutes}: ${tmp}${seconds}`;
      }
    },
    created() {
      this.time = this.convertToMin(this.track.trackTimeMillis);
    }
  };
</script>
