
<style>

  body {
    color: #526066;
  }

  h2, h3 {
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-weight: 600;
  }

  p {
    line-height: 1.6em;
  }



  h1,h2,h3,p{

    color: white;
  }

  h1,h2,h3{
    text-align: center;
  }

  .banner {
    background: transparent url('http://cdn.wallpapersafari.com/2/54/GzWCaZ.jpg')0 0 no-repeat fixed;;
    text-align: center;
    background-size: cover;
    height: 200px;
    width: 100%;
    margin-bottom: 3em;
    display: table;
  }

  #page-home li {
    text-decoration: none;
    color: inherit;
  }


  /*
   * -- Layout Styles --
   */

  .l-content {
    margin: 0 auto;
  }

  .l-box {
    padding: 0.5em 2em;
  }

  /*
   * -- Content Table --
   *
   */
  .content-table {
    border: 1px solid #ddd;
    margin: 0 0.5em 2em;
    padding: 0 0 1em;
    background-color: #f7f7f7;
  }

  /*
   * -- Couleur Table HEader --
   *
   */
  .table-song .table-header {
    background: #BBDEFB;
  }

  .table-album .table-header {
    background: #90CAF9;
  }

  /*
   * -- Table Header --
   *
   */
  .table-header {
    background: #64B5F6;
    color: #fff;
  }
  .table-header h2 {
    margin: 0;
    padding-top: 2em;
    font-size: 1em;
    font-weight: normal;

  }


  /*
   * -- Titre des tableau --
   *
   */
  .space-table {
    font-size: 6em;
    margin: 0.2em 0 0;
    font-weight: 100;
  }
  .space-table span {
    display: block;
    text-transform: uppercase;
    font-size: 0.2em;
    padding-bottom: 2em;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    *color: #fff;
  }



  /*
   * -- List des table --
   *
   */
  .table-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }


  /*
   * -- List dans les table --
   *
   */
  .table-list li {
    padding: 0.8em 0;
    background: #f7f7f7;
    border-bottom: 1px solid #e7e7e7;
  }


  /*
   * -- Button de tableaux  --
   */
  .button-choose {
    border: 1px solid #ccc;
    background: #fff;
    color: #333;
    border-radius: 2em;
    font-weight: bold;
    position: inherit;
    bottom: -1.5em;
  }

  .information-head {
    color: black;
    font-weight: 500;
  }

  .footer {
    background: #111;
    color: #888;
    text-align: center;
  }
  .footer a {
    color: #ddd;
  }




  @media(min-width: 767px) {

    .banner-head {
      font-size: 4em;
    }
    .content-table {
      margin-bottom: 0;
    }

  }


  @media (min-width: 480px) {
    .banner {
      height: 400px;
    }
    .banner-head {
      font-size: 3em;
    }
  }


  body, html {
    height: 100%;
    background-color: #34495e;

  }

  .column {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 10px;
    height: 400px;
  }

  .row {
    display: -webkit-flex;
    display: flex;
  }



  .splash-container {
    background: #1f8dd6;
    z-index: 1;
    overflow: hidden;
    width: 100%;
    height: 88%;
    top: 0;
    left: 0;
    position: fixed !important;
  }



  .splash-head {
    font-size: 20px;
    font-weight: bold;
    color: white;
    border: 3px solid white;
    padding: 1em 1.6em;
    font-weight: 100;
    border-radius: 5px;
    line-height: 1em;
  }

</style>

<template>

  <div id="page-home">
    <div class="banner" id="home">
      <div>
      <h1 style="color: white">Ubeat</h1>
        <h3 style="color: gray">Bienvenue sur Ubeat</h3>
        <h3 style="color: gray">Une nouvelle manière de consommer de la musique </h3>
          <button class="button-choose pure-button">Sign In</button>
          <p style="padding: 10%"></p>
      </div>
    </div>

  <div class="l-content">
      <div class="row">
        <div class="column"  style="background-color:#ccc;">

          <div class="pure-u-1 pure-u-md-1-3">

            <!-- -->
            <div class="content-table table-song">

              <!-- h eader de couleur Artiste-->
              <div class="table-header">
                <h2>Song</h2>

                <span class="space-table">
                  <span></span>
                </span>

              </div>

              <ul class="table-list">
                <li>______</li>
                <li>______</li>
                <li>______</li>
                <li>______</li>
                <li>______</li>

              </ul>

              <div style="text-align: center;">
                <button class="button-choose pure-button">Full List</button>
              </div>
            </div>
          </div>


        </div>


        <div class="column" style="background-color:#bbb;">

          <div class="pure-u-1 pure-u-md-1-3">
            <div class="content-table table-album">
              <div class="table-header">
                <h2>Album</h2>

                <span class="space-table">
                  <span></span>
                </span>

              </div>

              <ul class="table-list">
                <li>
                  <router-link to="/album" class="album-link">
                    The END
                  </router-link>
                </li>
                <li>______</li>
                <li>______</li>
                <li>______</li>
                <li>______</li>
              </ul>

              <div style="text-align: center;">
                <button class="button-choose pure-button">Full List</button>
              </div>
            </div>
          </div>




        </div>
        <div class="column" style="background-color:#ccc;">

          <div class="pure-u-1 pure-u-md-1-3">
            <div class="content-table">

              <!-- h eader de couleur Artiste-->
              <div class="table-header">
                <h2>Artist</h2>

                <span class="space-table">
                  <span></span>
                </span>

              </div>

              <ul class="table-list">
                <li>
                  <router-link to="/artist" class="album-link">
                    The Black Eyed Peas
                  </router-link>
                </li>
                <li>________</li>
                <li>________</li>
                <li>________</li>
                <li>________</li>
              </ul>

              <div style="text-align: center;">
                <button class="button-choose pure-button">Full List</button>
              </div>
            </div>
          </div>


        </div>
      </div>

          <div>
              <h2>About</h2>
          </div>


        <div class="information pure-g">
          <div class="pure-u-1 pure-u-md-1-2">
            <div class="l-box">
              <h3 class="information-head">Get started today</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
          </div>

          <div class="pure-u-1 pure-u-md-1-2">
            <div class="l-box">
              <h3 class="information-head">Information</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
              </p>
            </div>
          </div>
        </div> <!-- end information -->
      </div>
  </div>


</template>
