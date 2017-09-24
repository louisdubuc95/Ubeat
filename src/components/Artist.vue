<style>
    :root {
        --blue-color : #3498db;
    }

    p {
        margin: 0.7em 0;
    }
    img {
        border-radius: 3px;
        max-height: 100%;
        max-width: 100%;
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
    }
</style>

<template>
    <div>
        <section>
            <article>
                <div>
                    <img src="http://mp3got.ru/covers/artists/black-eyed-peas-274884037140-SzMax.jpg" />
                    <a href="https://itunes.apple.com/ca/artist/the-black-eyed-peas/id360391" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/fr-fr/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;max-width:100%;max-height:100%;"></a>
                </div>
                <div>
                    <div class="general_info">
                        <p class="artist_name">The Black Eyed Peas</p>
                        <p class="artist_meta_info">
                            <span class="artist_genre">Hip-Hop/Rap</span><br />
                        </p>
                        <p class="albums_title">Discography</p>
                    </div>
                    <div style="color: white">
                        <ul>
                          <li class="active">
                              <span class="album_year">1998</span>
                              <span class="album_title">Behind The Front</span>
                          </li>
                          <li>
                              <span class="album_year">2000</span>
                              <span class="album_title">Bridging The Gap</span>
                          </li>
                          <li>
                              <span class="album_year">2003</span>
                              <span class="album_title">Elephunk</span>
                          </li>
                          <li>
                              <span class="album_year">2005</span>
                              <span class="album_title">Monkey Business</span>
                          </li>
                          <li>
                              <span class="album_year">2009</span>
                              <span class="album_title">The END</span>
                          </li>
                          <li>
                              <span class="album_year">2010</span>
                              <span class="album_title">The Beginning</span>
                          </li>
                        </ul>
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>
