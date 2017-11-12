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

<style>
header {
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    z-index: 3;
}

header nav {
    position: relative;
}

header nav #menu-bars {
    float: right;
    padding: 25px;
    color: #FFF;
}

header nav #menu-bars:hover {
    cursor: pointer;
}

header nav a {
    display: none;
    padding: 30px 20px;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 11px;
    font-weight: bold;
}

header nav a.menu-opened,
header nav #menu-search.menu-opened {
    display: block;
}

header nav a:hover {
    background-color: #1db954;
}

header nav a i.fa {
    display: none;
}

header nav #menu-home {
    display: block;
}

header nav #menu-search {
    display: none;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, .5);
    color: #FFF;
    padding: 10px 0;
    margin: 0 0 30px 20px;
    font-size: 11px;
    width: calc(100% - 40px);
    order: 4;
}

header nav #menu-right {
    display: flex;
    flex-direction: column;
}

@media screen and (min-width: 35.5em) {

    header nav a,
    header nav #menu-home {
        display: inline-block;
    }

    header nav a i.fa {
        display: inline-block;
    }

    header nav a span {
        display: none;
    }

    header nav #menu-bars {
        display: none;
    }

    header nav #menu-left,
    header nav #menu-right {
        display: block;
    }

    header nav #menu-left {
        float: left;
    }

    header nav #menu-right {
        float: right;
        display: block;
    }

    header nav #menu-search {
        display: inline;
        margin: 0;
        width: 200px;
    }

}

@media screen and (min-width: 48em) {

    header nav a span {
        display: inline;
    }

}
</style>
