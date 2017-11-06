<template>
  <div id="rootElemTrack">
    <span>{{taskData.trackName}}</span>
    <span>{{taskData.artistName}}</span>
    <span>{{taskData.collectionName}}</span>
    <span>{{data.time}}</span>
  </div>
</template>

<script>
  export default {
    data: {
      time: ''
    },
    props: ['idPlaylist', 'idTrack', 'taskData'],
    methods: {
      convertToMin(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        /* `${UBeatUnsecureAPI.url}/playlists` */
        let tmp = '';
        if (seconds < 10) {
          tmp = 0;
        }
        return `${minutes}: ${tmp}${seconds}`;
      }
    },
    created() {
      this.time = this.convertToMin(this.taskData.trackTimeMillis);
    }
  };
</script>
