<template>
    <header>
        <nav>
            <div id="menu-bars" @click="toggleMenu">
                <span><i class="fa fa-lg fa-bars"></i></span>
            </div>
            <div id="menu-left">
                <router-link to="/" @click.native="hideMenu" id="menu-home"><i class="fa fa-home"></i> <span>Home</span></router-link>
                <router-link v-if="connected" to="/playlists" @click.native="hideMenu" class="menu-link"><i class="fa fa-folder-open"></i> Browse playlists</router-link>
            </div>
            <div id="menu-right">
                <input v-if="connected" id="menu-search" v-model="globalSearch" @keyup.enter="submitSearch" class="menu-link" type="search" placeholder="Looking for something ?" />
                <router-link v-if="connected" :to="`/profile/${userId}`" @click.native="hideMenu" class="menu-link"><i class="fa fa-user"></i> <span>My profile</span></router-link>
                <router-link v-if="connected" to="/" @click.native="signout" class="menu-link"><i class="fa fa-sign-out"></i> <span>Sign out</span></router-link>
                <a v-else @click="showmSignMenu" class="menu-link"><i class="fa fa-sign-in"></i> <span>Sign in</span></a>
            </div>
        </nav>
        <div v-if="authentication.show">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div id="login_signup" class="login-page">
                            <div class="form">
                                <form v-if="authentication.type == 'signup'" class="login-form" @submit.prevent="signup">
                                    <a href="#" class="close" @click="closemodal"></a>
                                    <h1>Create account</h1>
                                    <input type="text" placeholder="Username" v-model="authentication.username"/>
                                    <input type="password" placeholder="Password" v-model="authentication.password"/>
                                    <input type="email" placeholder="e-Mail" v-model="authentication.email"/>
                                    <input type="submit" value="Create" />

                                    <p class="message">Already registered? <a @click="switchform()">Sign in</a></p>
                                </form>

                                <form v-else-if="authentication.type == 'signin'" class="login-form" @submit.prevent="signin">
                                    <a href="#" class="close" @click="closemodal"></a>
                                    <img class="pure-img pure-u-1-2" style="width: 40%;  margin-bottom: 15px;" src="/static/images/profile.png">
                                    <input type="email" placeholder="e-Mail" v-model="authentication.email" />
                                    <input type="password" placeholder="Password" v-model="authentication.password" />
                                    <input type="submit" value="Login" />

                                    <p class="message">Not registered? <a @click="switchform()">Create an account</a></p>
                                </form>

                                <div v-if="authentication.success && authentication.message" class="login-form">
                                    <div class="success-msg" style="color: #1db954">
                                        <i class="fa fa-check"></i>
                                        {{ authentication.message }}
                                    </div>
                                </div>
                                <div v-else-if="!authentication.success && authentication.message" class="login-form">
                                    <div class="error-msg" style="color: #d52929">
                                        <i class="fa fa-times-circle"></i>
                                        {{ authentication.message }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </header>
</template>

<script>
import SignupApi from './../assets/SignupApi';
import UsersApi from './../assets/UsersApi';

export default {
  data() {
    return {
      items: null,
      opened: false,
      authentication: {
        show: false,
        type: 'signin',
        success: false,
        message: '',
        username: '',
        password: '',
        email: '',
      },
      userId: '',
      token: undefined,
      globalSearch: '',
      connected: false
    };
  },
  created() {
    this.items = document.getElementsByClassName('menu-link');

    if (this.$cookie.get('token')) {
      UsersApi.getTokenInfo(this.$cookie.get('token'))
        .then((response) => {
          this.userId = response.id;
          this.connected = true;
        })
        .catch(() => {
          this.userId = '';
          this.connected = false;
        });
    }
    if (window.location.hash === '#/?login') {
      this.authentication.show = true;
      this.authentication.type = 'signin';
    }
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
    },
    showmSignMenu() {
      this.authentication.show = true;
      this.authentication.type = 'signin';
    },
    signup() {
      SignupApi.postsignup(
        this.authentication.username,
        this.authentication.email,
        this.authentication.password
      )
        .then(() => {
          this.authentication.type = '';
          this.authentication.success = true;
          this.authentication.message = 'The account has been created!';
          setTimeout(() => { this.authentication.message = ''; this.authentication.type = 'signin'; }, 2000);
        })
        .catch(() => {
          this.authentication.type = '';
          this.authentication.success = false;
          this.authentication.message = 'A user is already using this email or name.';
          setTimeout(() => { this.authentication.message = ''; this.authentication.type = 'signup'; }, 2000);
        });
    },
    signin() {
      SignupApi.postlogin(
        this.authentication.email,
        this.authentication.password
      )
        .then((response) => {
          this.$cookie.set('token', response.token, 7);
          this.connected = true;
          this.userId = response.id;

          this.authentication.type = '';
          this.authentication.success = true;
          this.authentication.message = 'You are now connected!';
          setTimeout(() => { this.authentication.message = ''; this.authentication.show = false; }, 2000);
        })
        .catch(() => {
          this.authentication.type = '';
          this.authentication.success = false;
          this.authentication.message = 'Invalid or wrong credentials';
          setTimeout(() => { this.authentication.message = ''; this.authentication.type = 'signin'; }, 2000);
        });
    },
    switchform() {
      this.authentication.type = this.authentication.type === 'signup' ? 'signin' : 'signup';
    },
    signout() {
      this.$cookie.delete('token');
      this.connected = false;
      this.userId = '';
    },
    closemodal() {
      this.authentication.show = false;
    },
    submitSearch() {
      this.$router.push({
        name: 'Search',
        query: {
          mode: 'global',
          q: this.globalSearch
        }
      });
    }
  },
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
    cursor: pointer;
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #1db954;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all ;
  transition: all ;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
  cursor: pointer;
}
.form .register-form {
  display: none;
}

.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}

.modal-error {
  color: #b00b0b;
  font-weight: bold;
}
</style>
