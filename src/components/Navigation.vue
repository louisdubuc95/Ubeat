<template>
    <header>
        <nav>
            <div id="menu-bars" v-on:click="displayMenu">
                <span><i class="fa fa-lg fa-bars"></i></span>
            </div>
            <div id="menu-left">
                <router-link to="/" id="menu-home"><i class="fa fa-home"></i> <span>Home</span></router-link>
                <router-link to="/playlists" class="menu-link"><i class="fa fa-folder-open"></i> Browse playlists</router-link>
            </div>
            <div id="menu-right">
                <input id="menu-search" type="search" placeholder="Looking for something ?" />
                <router-link to="/" class="menu-link"><i class="fa fa-user"></i> <span>My profile</span></router-link>
                <router-link to="/" class="menu-link"><i class="fa fa-cog"></i> <span>Settings</span></router-link>
                <router-link to="/" class="menu-link"><i class="fa fa-sign-out"></i> <span>Sign out</span></router-link>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
  methods: {
    displayMenu: () => {
      const menuLinks = document.getElementsByClassName('menu-link');
      const menuSearch = document.getElementById('menu-search');

      menuSearch.classList.toggle('menu-opened');

      for (let i = 0; i < menuLinks.length; i += 1) {
        menuLinks[i].classList.toggle('menu-opened');
      }
    }
  }
};
</script>
