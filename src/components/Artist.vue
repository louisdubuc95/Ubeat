<style>
  /*:root {
      --blue-color : #3498db;
  }

  p {
      margin: 0.7em 0;
  }
  article {
      font-size: 16px;
      height: 400px;
      margin: 20px 0;
      overflow: hidden;
  }
  article > div {
      box-sizing: border-box;
      float: left;
      height: 100%;
      padding: 15px 5px;
  }
  article > div:first-child {
      display: flex;
      flex-direction: column;
      width: 30%;
  }
  article > div:first-child > * {
      margin: auto;
  }
  article > div:first-child > img {
      max-height: 80%;
  }
  article > div:last-child {
      width: calc(100% - 30%);
  }

  article > div:last-child > div {
      overflow: hidden;
  }
  article > div:last-child > div:first-child {
      height: 70%;
  }
  .artist_name {
      font-size: 30px;
      font-weight: bold;
  }
  .artist_meta_info {
      font-style: italic;
  }
  article > div:last-child > div:last-child {
      display: flex;
      height: calc(100% - 70%);
  }
  article > div:last-child > div:last-child ul {
      border: solid 1px white;
      flex-grow: 1;
      font-family: 'Jura', sans-serif;
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: scroll;
  }
  article > div:last-child > div:last-child ul li {
      border-bottom: solid 1px white;
      font-size: 14px;

  }
  article > div:last-child > div:last-child ul li:hover {
      color: var(--blue-color);
  }
  .album_year {
      display: inline-block;
      margin: 0 15px 0 0;
  }
  .albums_title
  {
     font-size: 24px;
     font-weight: bold;
     text-align: left;
  }
  .general_info
  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width : 1024px) {
      article {
          font-size: 14px;
          max-height: 300px;
      }
      .artist_name {
          font-size: 27px;
          font-weight: bold;
      }
      .album_artist {
          font-size: 18px;
      }
      article > div:last-child > div:last-child ul li {
          font-size: 13px;
      }
  }
  @media (max-width: 768px) {
      article {
          font-size: 11px;
          max-height: 250px;
      }
      .artist_name {
          font-size: 20px;
          font-weight: bold;
      }
      .album_artist {
          font-size: 13px;
      }
      article > div:last-child > div:last-child ul li {
          font-size: 10px;
      }
  }*/

  <meta name="viewport" content="width=device-width" />

  img {
    border-radius: 3px;
    align-self: start;
    justify-self: start;
    height: auto;
    width: 85%;
}
.albums_title {
  border-bottom: thin double #ecf0f1;
  border-top: thin double #ecf0f1;
  font-size: 180%;
  font-weight: normal;
}
.general_info {
  grid-column: 3;
}
.genre_label {
  color: #bdc3c7;
  font-size: 90%;
  font-weight: thin;
  /*text-decoration: underline ;*/
}
.artist_genre {
  font-size: 120%;
  font-weight: normal;
  font-style: oblique;
}
.artist_name {
  font-size: 200%;
  text-shadow: 2px 2px #34495e;
  text-align: left;
}
.album_list_element {
  align-items: center;
  background: linear-gradient(175deg, #34495e, #34495e 75%, #1e1e1e);
  border-bottom: thin solid #ecf0f1;
  border-bottom-left-radius: 5px;
  border-left: 5px solid #3498db;
  border-top-left-radius: 5px;
  box-shadow: -1px 0px 0px 0px #2c3e50;
  display: grid;
  grid-column-gap: 0px;
  grid-template-columns: 15% 85%;
  grid-template-rows: 50% 50%;
  justify-items: start;
  list-style: none;
  text-align: left;
}
.album_list_element:hover {
  background: linear-gradient(120deg, #34495e, #1e1e1e);
  border-left: 5px solid #2c3e50;
  /*color: #3498db;*/
}
.album_img {
  border-radius: 3px;
  grid-column: 1;
  grid-row: 1 / span 2;
  max-width: 100px;
}
.album_year {
  font-family: 'Andalus';
  font-weight: normal;
  grid-column: 2;
  grid-row: 1;
}
.album_title {
  font-size: 120%;
  grid-column: 2;
  grid-row: 2;
}
.info_and_albums {
   align-content: left;
   color: #ecf0f1;
   grid-column-gap: 20px;
   display: grid;
   font-family: 'Liberation Sans';
   font-weight: bold;
   grid-template-columns: 40% 60%;
   justify-items: start;
 }

  @media screen and (max-width: 568px) {
    img {
        align-content: center;
        max-height: 80%;
        max-width: 80%;
    }
    .info_and_albums {
      grid-template-columns: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    img {
        align-content: center;
        max-height: 80%;
        max-width: 80%;
    }
    .info_and_albums {
      grid-template-columns: 100%;
    }
  }

</style>

<template>
    <div>
        <section>
            <article>
                <div class="info_and_albums">
                  <div>
                      <img src="../../static/black-eyed-peas-general.jpg" />
                      <br>
                      <a href="https://itunes.apple.com/ca/artist/the-black-eyed-peas/id360391" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/fr-fr/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;max-width:100%;max-height:100%;"></a>
                  </div>
                  <div>
                    <div class="general_info">
                        <h1 class="artist_name">The Black Eyed Peas</h1>
                        <p class="artist_meta_info">
                            <span class="genre_label">Genre</span>
                            <span class="artist_genre">Hip-Hop/Rap</span><br />
                        </p>
                        <p class="albums_title">Discography</p>
                    </div>
                    <div>
                      <ul>
                        <li class="album_list_element">
                          <img class="album_img" src="../../static/behind-the-front.jpeg" />
                          <span class="album_year">1998</span>
                          <span class="album_title">Behind The Front</span>
                        </li>
                        <li class="album_list_element">
                          <img class="album_img" src="../../static/bridging-the-gap.jpeg" />
                          <span class="album_year">2000</span>
                          <span class="album_title">Bridging The Gap</span>
                        </li>
                        <li class="album_list_element">
                          <img class="album_img" src="../../static/elephunk.jpeg" />
                          <span class="album_year">2003</span>
                          <span class="album_title">Elephunk</span>
                        </li>
                        <li class="album_list_element">
                          <img class="album_img" src="../../static/monkey-business.jpeg" />
                          <span class="album_year">2005</span>
                          <span class="album_title">Monkey Business</span>
                        </li>
                        <li class="album_list_element">
                          <img class="album_img" src="../../static/the-end.jpeg" />
                          <span class="album_year">2009</span>
                          <span class="album_title">The END</span>
                        </li>
                        <li class="album_list_element">
                          <img class="album_img" src="../../static/the-beginning.jpeg" />
                          <span class="album_year">2010</span>
                          <span class="album_title">The Beginning</span>
                        </li>
                        <li class="album_list_element">
                          <img class="album_img" src="the-beginning.jpeg" />
                          <span class="album_year">2010</span>
                          <span class="album_title">Et si j'avais un titre vraiment interminable qu'est-ce qu'il ferait avec selon toi ?</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            </article>
        </section>
    </div>
</template>
