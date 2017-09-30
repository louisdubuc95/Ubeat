<style>
  :root {--blue-color : #3498db;}

  .icon {
    width: 1em;
    height: 1em;
    margin: auto;
  }

  /* Header Navbar */
  .header-container {
      margin-bottom: 4em;
      font-size: 1.2em;
  }

  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 4em;
    line-height: 4em;
    color: white;
    background-color: #34495e;
  }

  /* Navbar */
  .nav {
    /*float: left;*/
    display: flex;
    justify-content: space-between;
  }

  .nav a {
    color: white;
    padding: 5px;
    text-decoration: none;
  }

  .nav a:hover {color: var(--blue-color);}

  /* Logo */
  .nav .logo {
    /*font-style: italic;
    text-decoration: underline;*/
  }

  .nav .logo:hover {
      color: white;
      cursor: help;
  }

  .img_logo {
    border-radius: 10px;
    border-style: groove;
    border-width: medium;
    border-color: #505050;
    width: 135px;
  }

  /* Dropdown for the user information
  ** And the sign up button             */
  .dropdown {
    /*padding-left: 55em;*/
    color: white;
    display: inline-block;
    text-decoration: none;
    width: 13%;
  }

  .dropdown-content {
      background-color: #34495e;
      border-radius: 0px 10px 5px 60px;
      box-shadow: 4px 5px 7px 2px rgba(255, 255, 255, 0.9);
      display: none;
      height: auto;
      position: absolute;
      width: 13%;
      z-index: 1;
  }

  .dropdown-content a {
      border-radius: 0px 10px 5px 60px;
      color: white;
      display: block;
      height: 60px;
      text-align: center;
      text-decoration: none;
  }

  .dropdown-content a:hover {
    background-color: var(--blue-color);
    color: white;
  }

  .dropdown:hover .dropdown-content {
      display: block;
  }

  .dropbtn {
    background-color: #34495e;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1em;
    height: auto;
    padding: 0 2em;
    text-decoration: none;
    width: auto;
  }

  .dropdown:hover .dropbtn {
    color: var(--blue-color);
  }

  .research {
    align-self: center;
    border-radius: 7px;
    display: inline;
    font-size: 16px;
    height: 13px;
    margin-right: 5px;
    position: relative;
    width: 13%;
  }

  /* Screen adaptation */
  /* Tablet */
  @media only screen and (max-width : 1080px) {
    .header {
      height: 2em;
      line-height: 2em;
    }

    .header-container {
        margin-bottom: 2em;
    }

    .img_logo {
      height: auto;
      width: 35%;
    }

    .home_link {
      font-size: medium;
    }

    .research {
      width: 80px;
    }
  }

  /* Cellphone */
  @media only screen and (max-width : 768px) {
    .header {
      position: static;
      height: 2em;
      line-height: 2em;
    }

    .header-icon {
      position: relative;
      display: block;
      float: left;
      top : 0;
      left: 0;
      right: 0;
      width: 3em;
      height: 4em;
      cursor: pointer;
    }

    .header-icon:after {
        content: '';
        position: absolute;
        display: block;
        width: 1.5em;
        top: 0.1em;
        left: 0.5em;
        box-shadow: 0 10px 0 1px #fff, 0 16px 0 1px #fff, 0 22px 0 1px #fff;
      }

    .nav {
      /* Other */
      background-color: black;
      width: 10em;
      color: white;

      /* Position */
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;

      /* Animation */
      -webkit-transform: translateX(-10em);
      transform: translateX(-10em);
    }

    .nav a {
      display: block;
      height: 3em;
      text-align: center;
      line-height: 3em;
    }

    .nav .dropdown {
      display: block;
      height: 2em;
      text-align: center;
      line-height: 0em;
    }

    .nav .dropdown-content {
      margin-left: 9em;
      margin-top: 0em;
    }
    .with--navbar {transform: translateX(10em);}

    #app.with--navbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;5
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      /*background-color: rgba(52, 73, 94,1.0)*/;
    }

    /* Researche */
    .research {
      border-radius: 60px;
      display: block;
      height: 10px;
      margin-top : 0px;
      margin-left: 4em;
      position: absolute;
      width: 70px;
    }

    .img_logo { display: none;}
  }
</style>

<script type="text/javascript"></script>

<template>
  <div class="header-container">
    <header class="header">
      <!-- icon for the mobile/tablet nav  -->
      <a id="header-icon" class="header-icon" onclick="if (document.getElementById('app').className == '') {
                                                                  document.getElementById('app').className = 'with--navbar';
                                                                } else {
                                                                  document.getElementById('app').className = '';
                                                                }">
      </a>

      <nav id="navbar" class="nav">
        <router-link to="/" class="logo">
          <img class="img_logo" src="../../static/ubeat1.png" />
        </router-link>
        <router-link to="/" class="home_link">Home</router-link>
        <router-link to="/album">Album</router-link>
        <router-link to="/artist">Artist</router-link>
        <!-- User -->
        <div class="dropdown">
          <button class="dropbtn">
            <span id="username">Our Name</span>
          </button>
          <div class="dropdown-content">
            <router-link to="/">Parameter</router-link>
            <a href="#" onclick="document.getElementById('username').innerHTML = 'Our Name';">Sign in</a>
            <a href="#" onclick="document.getElementById('username').innerHTML = 'Disconnected';">Sign up</a>
            <a href="#" onclick="document.getElementById('username').innerHTML = 'Disconnected';">Sign out</a>
          </div>
        </div>
        <!-- Research -->
        <input  style="color: black" class="research" type="search" placeholder="Search"/>
      </nav>
    </header>
  </div>
</template>
