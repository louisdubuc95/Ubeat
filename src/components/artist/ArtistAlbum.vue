<template>
  <div class="artist-album pure-u-lg-1-5 pure-u-md-1-3 pure-u-sm-1-2 pure-u-1">
    <router-link :to="`/album/${album.collectionId}`">
        <img class="pure-img" :src="album.artworkUrl100.replace('100x100', '300x300')" />
        <h4>{{ album.collectionName }}</h4>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'artist-album',
  props: ['album']
};
</script>
