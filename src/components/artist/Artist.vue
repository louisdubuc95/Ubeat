<template>
    <main id="artist">
        <section id="artist-infos">
            <div class="container">
                <h1>{{ artist.artistName }}</h1>
                <div id="artist-specs">
                    <p id="specs-genre">{{ artist.primaryGenreName }}</p>
                    <a :href="artist.artistLinkUrl" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a>
                </div>
                <div id="artist-actions">
                    <a class="pure-button pure-button-primary">Play</a>
                    <a class="pure-button pure-button-primary">Add to favorites</a>
                </div>
            </div>
        </section>
        <section id="artist-albums">
            <div class="container">
                <h3>Albums</h3>
                <div class="pure-g">
                    <artist-album v-for="album in albums" :album="album" :key="album.collectionId"></artist-album>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import ArtistAlbum from '@/components/artist/ArtistAlbum';

export default {
  name: 'Artist',
  components: {
    ArtistAlbum
  },
  data() {
    return {
      artist: {},
      albums: []
    };
  },
  created() {
    this.$http.get(`artists/${this.$route.params.id}`)
      .then(response => response.json())
      .then((response) => {
        this.artist = response.results[0];
      });
    this.$http.get(`artists/${this.$route.params.id}/albums`)
      .then(response => response.json())
      .then((response) => {
        this.albums = response.results;
      });
  }
};
</script>

<style>
</style>
