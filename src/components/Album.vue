<style>
    #page_album p {
        margin: 0.7em 0;
    }

    #page_album a {
        text-decoration: none;
        color: inherit;
    }

    #page_album img {
        border-radius: 3px;
        max-width: 100%;
        max-height: 100%;
    }

    #page_album article {
        height: 400px;
        margin: 20px 0;
        overflow: hidden;
        font-size: 16px;
    }

    #page_album article > div {
        height: 100%;
        float: left;
        box-sizing: border-box;
        padding: 15px 5px;
    }

    #page_album article > div:first-child {
        width: 30%;
        display: flex;
        flex-direction: column;
    }

    #page_album article > div:first-child > * {
        margin: auto;
    }

    #page_album article > div:first-child > img {
        max-height: 80%;
    }

    #page_album article > div:last-child {
        width: calc(100% - 30%);
    }

    #page_album article > div:last-child > div {
        overflow: hidden;
    }

    #page_album article > div:last-child > div:first-child {
        height: 70%;
    }

    #page_album .album_name {
        font-size: 30px;
        font-weight: bold;
    }

    #page_album .album_artist {
        font-size: 20px;
    }

    #page_album .album_meta_info {
        font-style: italic;
    }

    #page_album .album_release_date {
        font-weight: lighter;
    }

    #page_album .album_nb_songs {
        font-size: 20px;
    }

    #page_album article > div:last-child > div:last-child {
        height: calc(100% - 70%);
        display: flex;
    }

    #page_album article > div:last-child > div:last-child ul {
        flex-grow: 1;
        list-style: none;
        padding: 0;
        margin: 0;
        overflow: auto;
        border: solid 1px white;
        font-family:
            "Jura",
            sans-serif;
    }

    #page_album article > div:last-child > div:last-child ul li {
        font-size: 14px;
        border-bottom: solid 1px white;
    }

    #page_album article > div:last-child > div:last-child ul li.active,
    #page_album article > div:last-child > div:last-child ul li:hover {
        color: var(--blue-color);
    }

    #page_album .song_num {
        display: inline-block;
        margin: 0 15px 0 0;
    }

    @media (max-width : 1024px) {
        #page_album article {
            max-height: 300px;
            font-size: 14px;
        }

        #page_album .album_name {
            font-size: 27px;
            font-weight: bold;
        }

        #page_album .album_artist {
            font-size: 18px;
        }

        #page_album .album_nb_songs {
            font-size: 18px;
        }

        #page_album article > div:last-child > div:last-child ul li {
            font-size: 13px;
        }

    }

    @media (max-width: 768px) {
        #page_album article {
            max-height: 250px;
            font-size: 11px;
        }

        #page_album .album_name {
            font-size: 20px;
            font-weight: bold;
        }

        #page_album .album_artist {
            font-size: 13px;
        }

        #page_album .album_nb_songs {
            font-size: 13px;
        }

        #page_album article > div:last-child > div:last-child ul li {
            font-size: 10px;
        }

    }
</style>

<template>
    <div id="page_album">
        <section>
            <article>
                <div>
                    <img src="https://is4-ssl.mzstatic.com/image/thumb/Music/v4/54/e9/3a/54e93a28-1bcd-7ee0-9f21-9adb62a0d327/source/268x0w.jpg" />
                    <a href="https://geo.itunes.apple.com/us/album/i-gotta-feeling/id318390146?i=318393999&mt=1&app=music" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/itunes-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;max-width:100%;max-height:100%;"></a>
                </div>
                <div>
                    <div>
                        <p class="album_name">The E.N.D. (The Energy Never Dies)</p>
                        <router-link to="/artist">
                            <p class="album_artist">The Black Eyed Peas</p>
                        </router-link>
                        <p class="album_meta_info">
                            <span class="album_genre">Pop</span><br />
                            <span class="album_release_date"><time datetime="Jun 3, 2009">Jun 3, 2009</time></span><br />
                            <span class="album_nb_songs">15</span> songs
                        </p>
                    </div>
                    <div style="color: white">
                        <button type="button" class="play">Play</button>
                        <ul>
                            <li class="active   ">
                                <span class="song_num">#1</span><span class="song_name">Boom Boom Pow</span><br />
                                <span class="song_duration">4:11</span>
                            </li>
                            <li>
                                <span class="song_num">#2</span><span class="song_name">Rock That Body</span><br />
                                <span class="song_duration">4:28</span>
                            </li>
                            <li>
                                <span class="song_num">#3</span><span class="song_name">Meet Me Halfway</span><br />
                                <span class="song_duration">4:44</span>
                            </li>
                            <li>
                                <span class="song_num">#4</span><span class="song_name">Imma Be</span><br />
                                <span class="song_duration">4:17</span>
                            </li>
                            <li>
                                <span class="song_num">#5</span><span class="song_name">I Gotta Feeling</span><br />
                                <span class="song_duration">4:49</span>
                            </li>
                            <li>
                                <span class="song_num">#6</span><span class="song_name">Alive</span><br />
                                <span class="song_duration">5:03</span>
                            </li>
                            <li>
                                <span class="song_num">7#</span><span class="song_name">Missing You</span><br />
                                <span class="song_duration">4:34</span>
                            </li>
                            <li>
                                <span class="song_num">#8</span><span class="song_name">Ring-A-Ling</span><br />
                                <span class="song_duration">4:32</span>
                            </li>
                            <li>
                                <span class="song_num">#9</span><span class="song_name">Party All the Time</span><br />
                                <span class="song_duration">4:43</span>
                            </li>
                            <li>
                                <span class="song_num">#10</span><span class="song_name">Out of My Head</span><br />
                                <span class="song_duration">3:51</span>
                            </li>
                            <li>
                                <span class="song_num">#11</span><span class="song_name">Electric City</span><br />
                                <span class="song_duration">4:08</span>
                            </li>
                            <li>
                                <span class="song_num">#12</span><span class="song_name">Showdown</span><br />
                                <span class="song_duration">4:27</span>
                            </li>
                            <li>
                                <span class="song_num">#13</span><span class="song_name">Now Generation</span><br />
                                <span class="song_duration">4:05</span>
                            </li>
                            <li>
                                <span class="song_num">#14</span><span class="song_name">One Tribe</span><br />
                                <span class="song_duration">4:40</span>
                            </li>
                            <li>
                                <span class="song_num">#15</span><span class="song_name">Rockin' to the Beat</span><br />
                                <span class="song_duration">3:45</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>
