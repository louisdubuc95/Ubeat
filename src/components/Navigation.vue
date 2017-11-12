<template>
    <header>
        <nav>
            <div id="menu-bars" @click="toggleMenu">
                <span><i class="fa fa-lg fa-bars"></i></span>
            </div>
            <div id="menu-left">
                <router-link to="/" @click.native="hideMenu" id="menu-home"><i class="fa fa-home"></i> <span>Home</span></router-link>
                <router-link to="/playlists" @click.native="hideMenu" class="menu-link"><i class="fa fa-folder-open"></i> Browse playlists</router-link>
            </div>
            <div id="menu-right">
                <input id="menu-search" class="menu-link" type="search" placeholder="Looking for something ?" />
                <router-link to="/" @click.native="hideMenu" class="menu-link"><i class="fa fa-user"></i> <span>My profile</span></router-link>
                <router-link to="/" @click.native="hideMenu" class="menu-link"><i class="fa fa-cog"></i> <span>Settings</span></router-link>
                <router-link to="/" @click.native="hideMenu" class="menu-link"><i class="fa fa-sign-out"></i> <span>Sign out</span></router-link>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
  data() {
    return {
      items: null,
      opened: false
    };
  },
  created() {
    this.items = document.getElementsByClassName('menu-link');
  },
  methods: {
    hideMenu() {
      if (this.opened) {
        for (let i = 0; i < this.items.length; i += 1) {
          this.items[i].classList.remove('menu-opened');
        }
        this.opened = false;
      }
    },
    toggleMenu() {
      this.opened = !this.opened;
      for (let i = 0; i < this.items.length; i += 1) {
        this.items[i].classList.toggle('menu-opened');
      }
    }
  }
};
</script>
