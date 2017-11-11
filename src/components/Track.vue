<template>
  <div class="rootElemTrack">
      <div class="pure-u-7-24">
        {{ track.trackName }}
      </div>
      <div class="pure-u-1-4">
        {{ track.artistName }}
      </div>
      <div class="pure-u-5-24">
        {{ track.collectionName }}
      </div>
      <div class="pure-u-3-24">
        {{ time }}
      </div>
      <div class="pure-u-3-24" @click="remove">
        DELETE
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
      },
      remove() {
        this.$emit('removeTrack', this.track.trackId);
      }
    },
    created() {
      this.time = this.convertToMin(this.track.trackTimeMillis);
    }
  };
</script>

<style>
.rootElemTrack > div {
  float: left;
}
.rootElemTrack.active {
  color: red;
}
</style>