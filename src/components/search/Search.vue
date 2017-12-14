<template>
    <main id="search">
    </main>
</template>

<script>

import SearchApi from '@/assets/SearchApi';

function handleRep(promise, searchMethod) {
  promise.then((res) => {
    // faire un render du template en fonction de @res et @searchMethod
    // eslint-disable-next-line
    console.log('resultat requete search ', searchMethod, ': ' , res);
  });
}

export default {
  name: 'Search',
  components: {
  },
  data() {
    return {
    };
  },
  created() {
    // permet de récupérer les params URL
    // eslint-disable-next-line
    console.log(this.$route.query);

    // RQ: recherche de limit = 10 par défault
    // recherche globale
    if (this.$route.query.global !== undefined) {
      handleRep(SearchApi.global(this.$route.query.globale), 'global');
    } else { // recherche par album/artist/track/user
      if (this.$route.query.albums !== undefined) {
        handleRep(SearchApi.albums(this.albumSearch), 'albums');
      }
      if (this.$route.query.artists !== undefined) {
        handleRep(SearchApi.artists(this.artistSearch), 'artists');
      }
      if (this.$route.query.tracks !== undefined) {
        handleRep(SearchApi.tracks(this.trackSearch), 'tracks');
      }
      if (this.$route.query.users !== undefined) {
        handleRep(SearchApi.users(this.userSearch), 'users');
      }
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>
