<style>
  :root {
    --blue-color : #BBDEFB;
  }

  .pure-menu-scrollable {
      overflow-x: visible !important;
      overflow-y: visible !important;
  }

  .custom-menu-wrapper {
      white-space: nowrap;
      position: relative;
  }

  .custom-menu {
      display: inline-block;
      width: auto;
      vertical-align: middle;
  }

  .custom-menu .pure-menu-link,
  .custom-menu .pure-menu-heading {
      color: white;
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

  .custom-menu-toggle .bar {
      background-color: white;
      display: block;
      width: 20px;
      height: 2px;
      border-radius: 100px;
      position: absolute;
      top: 22px;
      right: 12px;
  }

  .custom-menu-toggle .bar:first-child {
      -webkit-transform: translateY(-6px);
      -moz-transform: translateY(-6px);
      -ms-transform: translateY(-6px);
      transform: translateY(-6px);
  }

  .custom-menu-screen {
      background-color: rgba(0, 102, 205, 0.7);
      width: 70em;
      height: 3em;
      position: absolute;
      top: 0;
      z-index: -1;
  }

  .pure-menu-link:hover {
    background-color: var(--blue-color);
    cursor: pointer;
  }

  #dropdownUser li a {
    color: black;
  }

  #dropdownUser li a:hover {
    background-color: var(--blue-color);
  }


  @media (max-width: 62em) {

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
          border-top: 1px solid #eee;
          background-color: #808080\9;
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
          opacity: 0;
          opacity: 1\9;
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
        <a href="#" class="pure-menu-heading custom-menu-brand">Ubeat</a>
        <a id="toggle" href="#" class="custom-menu-toggle" onclick="document.getElementById('menu').classList.toggle('custom-menu-tucked');">
          <s class="bar"></s>
          <s class="bar"></s>
        </a>
    </div>
    <div id="menu" class="pure-menu pure-menu-horizontal pure-menu-scrollable custom-menu custom-menu-bottom custom-menu-tucked">
      <div class="custom-menu-screen"></div>
      <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-selected">
            <router-link to="/" class="pure-menu-link">Home</router-link>
          </li>
          <li class="pure-menu-item">
            <router-link to="/album" class="pure-menu-link">Album</router-link>
          </li>
          <li class="pure-menu-item pure-menu">
            <router-link to="/artist" class="pure-menu-link">Artist</router-link>
          </li>
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
              <a class="pure-menu-link">Ubeat-team11</a>
              <ul id="dropdownUser" class="pure-menu-children">
                  <li class="pure-menu-item">
                    <a href="#" class="pure-menu-link">Parameter</a>
                  </li>
                  <li class="pure-menu-item">
                    <router-link to="/" class="pure-menu-link">Sign In</router-link>
                  </li>
                  <li class="pure-menu-item">
                    <router-link to="/" class="pure-menu-link">Log up</router-link>
                  </li>
              </ul>
          </li>
          <li class="pure-menu-item pure-menu">
            <form class="pure-form">
              <input type="text" class="pure-input-rounded">
              <button type="button" class="pure-button">Search</button>
            </form>
          </li>
      </ul>
    </div>
  </div>

</template>
