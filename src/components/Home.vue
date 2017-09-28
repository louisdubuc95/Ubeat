
<style xmlns="http://www.w3.org/1999/html">

  body, html {
    height: 100%;
    background-color: #34495e;

  }

  .column {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 10px;
    height: 300px; /* Should be removed. Only for demonstration */
  }

  .row {
    display: -webkit-flex;
    display: flex;
  }

  .footer {
    background-color: #f1f1f1;
    padding: 10px;
    text-align: center;
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


  /* This is the main heading that appears on the blue section */
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

  .bgimg-1 {
    background-image: url('http://cdn.wallpapersafari.com/2/54/GzWCaZ.jpg');
    min-height: 100%;
    background-position: center;
    background-size: cover;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
    margin-top: auto;
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
</style>

<template>

  <div>


    <div class="banner" id="home">
      <div  >

      <h1 style="color: white">Ubeat</h1>
      <h3 style="color: white">Bienvenue sur Ubeat</h3>
      <h3 style="color: white">Une nouvelle manière de consommer de la musique </h3>
        <button class="pure-button">Log In </button>
      <p style="padding: 10%"></p>

      </div>
    </div>




  <div class="row">
    <div class="column"  style="background-color:#ccc;">

      <div class="pure-u-1 pure-u-md-1-3">
        <div class="pricing-table pricing-table-free">
          <div class="pricing-table-header">
            <h2>Song</h2>

            <span class="pricing-table-price">
               description de l'option + lien ("chose")
              <span>vers la page</span>
                    </span>
          </div>

          <ul class="pricing-table-list">
            <li>______</li>
            <li>______</li>
            <li>______</li>
            <li>______</li>
            <li>______</li>
            <li>______</li>
          </ul>

          <button class="button-choose pure-button">Choose</button>
        </div>
      </div>


    </div>


    <div class="column" style="background-color:#bbb;">

      <div class="pure-u-1 pure-u-md-1-3">
        <div class="pricing-table pricing-table-biz pricing-table-selected">
          <div class="pricing-table-header">
            <h2>Album</h2>

            <span class="pricing-table-price">
                        blabla
              <span>______</span>
            </span>
          </div>

          <ul class="pricing-table-list">
            <li>______</li>
            <li>______</li>
            <li>______</li>
            <li>______</li>
            <li>______</li>
            <li>______</li>
          </ul>

          <button class="button-choose pure-button">Choose</button>
        </div>
      </div>




    </div>
    <div class="column" style="background-color:#ccc;">

      <div class="pure-u-1 pure-u-md-1-3">
        <div class="pricing-table pricing-table-enterprise">
          <div class="pricing-table-header">
            <h2>Artist</h2>

            <span class="pricing-table-price">
                        blabla
              <span>_____</span>
            </span>
          </div>

          <ul class="pricing-table-list">
            <li>________</li>
            <li>________</li>
            <li>________</li>
            <li>________</li>
            <li>________</li>
            <li>________</li>
          </ul>

          <button class="button-choose pure-button">Choose</button>
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

</template>
