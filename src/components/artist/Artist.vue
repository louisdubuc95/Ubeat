<template>
    <main id="artist">
        <section class="header">
            <search-input :typeSearch="'artists'"></search-input>
            <div class="container">
                <h1>{{ artist.artistName }}</h1>
                <div id="artist-specs">
                    <p id="specs-genre">{{ artist.primaryGenreName }}</p>
                    <a :href="artist.artistLinkUrl" class="apple-music"></a>
                    <img class="pure-img" :src="image" />
                </div>
            </div>
        </section>
        <section class="content">
            <div class="container">
                <h3>Albums</h3>
                <div class="pure-g">
                    <artist-album v-for="album in albums" :album="album" :key="album.collectionId"></artist-album>
                </div>
                <div style="color: white;" id="artist-bio">
                  {{ biography }}
                </div>
            </div>
        </section>
    </main>
</template>

<script>

import ArtistApi from '@/assets/ArtistApi';
import ArtistAlbum from './ArtistAlbum';
import SearchInput from '../searchInput/SearchInput';

export default {
  name: 'Artist',
  components: {
    SearchInput,
    ArtistAlbum
  },
  data() {
    return {
      artist: {},
      albums: [],
      biography: '',
      image: '',
    };
  },
  created() {
    ArtistApi.get(this.$route.params.id)
      .then((artist) => {
        this.artist = artist;
        this.image = '';
        console.log(this.artist);
        this.$http.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.artist.artistName}&api_key=923b6ee93d08364b910129468fc2a024&format=json`)
        // this.$http.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=metallica&api_key=923b6ee93d08364b910129468fc2a024&format=json`)
        .then((response) => {
          console.log(response);
          if (response.body.artist.name !== 'Undefined') {
            this.biography = response.body.artist.bio.content;
          }
          this.image = response.body.artist.image[5]['#text'];
        });
      });
    ArtistApi.getAlbums(this.$route.params.id)
      .then((albums) => {
        this.albums = albums;
      });
  },
  mounted() { }
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

#artist #artist-bio {
  color: #000;
  white-space: pre-wrap;
}
</style>
