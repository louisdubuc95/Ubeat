<template>
    <main id="search">
    </main>
</template>

<script>

// import SearchAPi from '@/assets/SearchApi';

export default {
  name: 'Search',
  components: {
  },
  data() {
    return {
      allSearch: '',
      albumSearch: '',
      artistSearch: '',
      trackSearch: '',
      userSearch: ''
    };
  },
  created() {
    // permet de récupérer les params URL
    // eslint-disable-next-line
    console.log(this.$route.query);

    // recherche globale
    if (this.$route.query.all) {
      this.allSearch = this.$route.query.all;
    } else { // recherche par album/artist/track/user
      this.albumSearch = this.$route.query.album;
      this.artistSearch = this.$route.query.artist;
      this.trackSearch = this.$route.query.track;
      this.userSearch = this.$route.query.user;
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>
