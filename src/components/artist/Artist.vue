<template>
    <main id="artist">
        <section class="header">
            <div class="container">
                <h1>{{ artist.artistName }}</h1>
                <div id="artist-specs">
                    <p id="specs-genre">{{ artist.primaryGenreName }}</p>
                    <a :href="artist.artistLinkUrl" class="apple-music"></a>
                </div>
            </div>
        </section>
        <section class="content">
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
import ArtistApi from '@/assets/ArtistApi';
import ArtistAlbum from './ArtistAlbum';

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
    ArtistApi.get(this.$route.params.id)
      .then((artist) => {
        this.artist = artist;
      });
    ArtistApi.getAlbums(this.$route.params.id)
      .then((albums) => {
        this.albums = albums;
      });
  }
};
</script>

<style>
#artist .header h1 {
    color: #FFF;
    padding: 0 0 15px 0;
    font-size: 4rem;
    font-weight: normal;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
}

#artist .header #artist-specs #specs-genre {
    color: rgba(255, 255, 255, .4);
}

#artist .content h3 {
    margin-top: 0;
    color: #fff;
}

#artist .content .artist-album {
    padding: 30px 10px;
    box-sizing: border-box;
    text-align: center;
}

#artist .content .artist-album a {
    text-decoration: none;
}

#artist .content .artist-album img {
    margin: auto;
}

#artist .content .artist-album h4 {
    font-size: 14px;
    font-weight: normal;
    color: #FFF;
}
</style>
