<style>
  :root {--blue-color : #3498db;}

  /*
  ** Header Navbar
  */
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
    background-color: black;
  }
  
  /*
  ** Navbar
  */
  .nav {float: left;}

  .nav a {
    padding: 0 2em;
    text-decoration: none;
    color: white;
  }

  .nav a:hover {color: var(--blue-color);}

  /*
  ** Logo
  */
  .nav .logo {
    font-style: italic;
    text-decoration: underline;
  }

  .nav .logo:hover {
      color: white;
      cursor: default;
  }

  /*
  ** Dropdown for the user information
  ** And the sign up button
  */
  .dropdown {
    /*padding-left: 55em;*/
    text-decoration: none;
    color: white;
    display: inline-block;
  }

  .dropdown-content {
      display: none;
      position: absolute;
      background-color: black;
      box-shadow: 2px 8px 16px 0px rgba(255, 255, 255, 0.5);
      z-index: 1;
  }

  .dropdown-content a {
      color: white;
      text-decoration: none;
      display: block;
  }

  .dropdown-content a:hover {
    background-color: var(--blue-color);
    color: white;
  }

  .dropdown:hover .dropdown-content {
      display: block;
  }

  .dropbtn {
    background-color: black;
    padding: 0 2em;
    color: white;
    font-size: 1em;
    text-decoration: none;
    border: none;
    cursor: pointer;
  }

  .dropdown:hover .dropbtn {
    color: var(--blue-color);
  }

  /*
  ** Screen adaptation
  */
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
      width: 8em;
      color: white;

      /* Position */
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;

      /* Animation */
      -webkit-transform: translateX(-8em);
      transform: translateX(-8em);
    }

    .nav a {
      display: block;
      height: 3em;
      text-align: center;
      line-height: 3em;
    }

    .nav .dropdown {
      padding: 0 2em;
      float: none;
      display: block;
      height: 3em;
      text-align: center;
      line-height: 3em;
    }

    .with--navbar {transform: translateX(8em);}

    #app.with--navbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
</style>

<script type="text/javascript">
    // if (document.getElementById('app').className == '') {
    //   document.getElementById('app').className = 'with--navbar';
    // } else {
    //   document.getElementById('app').className = '';
    // }
</script>

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
        <router-link to="/" class="logo">Ubeat</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/album">Album</router-link>
        <router-link to="/artist">Artist</router-link>
        <!-- User -->
        <div class="dropdown">
          <button class="dropbtn">Our Name</button>
          <div class="dropdown-content">
            <router-link to="/">Parameter</router-link>
            <a href="#">Sign up</a>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
