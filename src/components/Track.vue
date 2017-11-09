<template>
  <div id="rootElemTrack">
    <span>{{idPlaylist}}</span>
    <span>{{track.trackName}}</span>
    <span>{{track.artistName}}</span>
    <span>{{track.collectionName}}</span>
    <span>{{time}}</span>
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
      document.getElementById('test').innerHTML = `time = ${this.time}, name = ${this.track.trackName}, artist = ${this.track.artistName}, album = ${this.track.collectionName}`;
    }
  };
</script>
