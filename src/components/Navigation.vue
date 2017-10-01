<style>
  :root {
    --blue-color : #BBDEFB;
  }

  .custom-menu-wrapper {
      white-space: nowrap;
      position: relative;
  }

  .custom-menu {
      display: inline-block;
      width: auto;
      vertical-align: middle;
      -webkit-font-smoothing: antialiased;
  }

  .custom-menu .pure-menu-link,
  .custom-menu .pure-menu-heading {
      color: white;
  }

  .custom-menu .pure-menu-link:hover {
      background-color: var(--blue-color);
  }

  .custom-menu-top {
      position: relative;
      padding-top: .5em;
      padding-bottom: .5em;
  }

  .custom-menu-brand {
      display: block;
      text-align: center;
      position: relative;
  }

  .custom-menu-toggle {
      width: 44px;
      height: 44px;
      display: block;
      position: absolute;
      top: 3px;
      right: 0;
      display: none;
  }

  .custom-menu-toggle:hover {
    cursor: pointer;
  }

  .custom-menu-toggle .bar {
      background-color: white;
      display: block;
      width: 20px;
      height: 2px;
      border-radius: 100px;
      position: absolute;
      top: 22px;
      right: 12px;
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      -ms-transition: all 0.5s;
      transition: all 0.5s;
  }

  .custom-menu-toggle .bar:first-child {
      -webkit-transform: translateY(-6px);
      -moz-transform: translateY(-6px);
      -ms-transform: translateY(-6px);
      transform: translateY(-6px);
  }

  .custom-menu-toggle.x .bar {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
  }

  .custom-menu-toggle.x .bar:first-child {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg);
  }

  .custom-menu-screen {
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      -ms-transition: all 0.5s;
      transition: all 0.5s;
      height: 3em;
      width: 90em;
      position: absolute;
      top: 0;
      z-index: -1;
  }

  .custom-menu-tucked .custom-menu-screen {
      -webkit-transform: translateY(-44px);
      -moz-transform: translateY(-44px);
      -ms-transform: translateY(-44px);
      transform: translateY(-44px);
  }


  @media only screen and (max-width: 1280px) {

      .custom-menu {
          display: block;
      }

      .custom-menu-toggle {
          display: block;
          display: none\9;
      }

      .custom-menu-bottom {
          position: absolute;
          width: 100%;
          z-index: 100;
      }

      .custom-menu-bottom .pure-menu-link {
          opacity: 1;
          -webkit-transform: translateX(0);
          -moz-transform: translateX(0);
          -ms-transform: translateX(0);
          transform: translateX(0);
          -webkit-transition: all 0.5s;
          -moz-transition: all 0.5s;
          -ms-transition: all 0.5s;
          transition: all 0.5s;
      }

      .custom-menu-bottom.custom-menu-tucked .pure-menu-link {
          -webkit-transform: translateX(-140px);
          -moz-transform: translateX(-140px);
          -ms-transform: translateX(-140px);
          transform: translateX(-140px);
      }

      .pure-menu-horizontal.custom-menu-tucked {
          z-index: -1;
          top: 45px;
          position: absolute;
          overflow: hidden;
      }
    }

</style>

<template>
  <div class="custom-menu-wrapper">
    <div class="pure-menu custom-menu custom-menu-top">
        <span class="pure-menu-heading custom-menu-brand">Ubeat</span>
        <a class="custom-menu-toggle" id="toggle" onclick="document.getElementById('menu').classList.toggle('custom-menu-tucked');
                                                                    document.getElementById('toggle').classList.toggle('x');">
          <s class="bar"></s>
          <s class="bar"></s>
        </a>
    </div>
    <div class="pure-menu pure-menu-horizontal pure-menu-scrollable custom-menu custom-menu-bottom custom-menu-tucked" id="menu">
      <div class="custom-menu-screen"></div>
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link to="/" class="pure-menu-link">Home</router-link></li>
        <li class="pure-menu-item"><router-link to="/album" class="pure-menu-link">Album</router-link></li>
        <li class="pure-menu-item"><router-link to="/artist" class="pure-menu-link">Artist</router-link></li>
        <li class="pure-menu-item"><router-link to="" class="pure-menu-link">Playlist</router-link></li>
        <li class="pure-menu-item">
          <input type="text" class="pure-input-rounded">
          <button type="button" class="pure-button">Search</button>
        </li>
        <span class="space"></span>
        <li class="pure-menu-item"><a class="pure-menu-link">Ubeat-team11</a></li>
        <li class="pure-menu-item"><a href=""class="pure-menu-link">Parameter</a></li>
        <li class="pure-menu-item"><a href=""class="pure-menu-link">Log Up</a></li>
      </ul>
    </div>
  </div>
</template>
