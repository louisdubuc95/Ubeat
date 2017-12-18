<template>
    <main id="artist">
        <section class="header">
            <search-input :typeSearch="'artists'"></search-input>
            <div class="pure-g container">
              <div id="artist-image" class="pure-u-sm-1-6 pure-u-1">
                  <img class="pure-img" :src="image" />
              </div>
              <div id="artist-text" class="pure-u-sm-5-6 pure-u-1">
                  <h1>{{ artist.artistName }}</h1>
                  <div id="artist-specs">
                      <p id="specs-genre">{{ artist.primaryGenreName }}</p>
                      <p id="specs-bio" v-html="biography"></p>
                      <a :href="artist.artistLinkUrl" class="apple-music"></a>
                  </div>
              </div>
            </div>
        </section>
        <section class="content">
            <div class="container">
                <h3>Albums</h3>
                <div id="albums-container" class="pure-g">
                    <artist-album v-for="album in albums" :album="album" :key="album.collectionId"></artist-album>
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
      biography: 'Loading biography...',
      image: '',
    };
  },
  created() {
    ArtistApi.get(this.$route.params.id)
      .then((artist) => {
        this.artist = artist;

        ArtistApi.getMore(this.artist.artistName)
          .then((more) => {
            if (more.name === 'Undefined') {
              this.biography = 'Biography not found for this artist';
              this.image = '/static/images/unknownArtist.png';
            } else {
              this.biography = `${more.bio.content.substr(0, 400)}...`;
              this.image = more.image[5]['#text'];
            }
          });
      });
    ArtistApi.getAlbums(this.$route.params.id)
      .then((albums) => {
        this.albums = albums;
      });
  }
};
</script>

<style>
#artist .header #artist-image img {
    margin: auto;
    border-radius: 50%;
}

#artist .header #artist-text {
    box-sizing: border-box;
}

#artist .header h1 {
    color: #FFF;
    padding: 0 0 15px 0;
    font-size: 4rem;
    font-weight: normal;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    text-align: center;
}

#artist .header #artist-specs #specs-genre,
#artist .header #artist-specs #specs-bio {
    color: rgba(255, 255, 255, .4);
    text-align: justify;
}

#artist .header p a {
    color: #fff;
}

#artist .header p a:hover {
    text-decoration: underline;
}

#artist .content h3 {
    margin-top: 0;
    color: #fff;
}

#artist .content #albums-container {
    margin-left: -10px;
    margin-right: -10px;
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

@media screen and (min-width: 35.5em) {

    #artist .header #artist-image img {
        margin: 0;
    }

    #artist .header #artist-text {
        padding-left: 30px;
    }

    #artist .header h1 {
      text-align: left;
    }

}
</style>
