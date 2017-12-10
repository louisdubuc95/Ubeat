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
                <input id="menu-search" v-model="searchAll" @keyup.enter="submitSearch" class="menu-link" type="search" placeholder="Looking for something ?" />
                <router-link :to="{path: '/profile/' + userId}" @click.native="hideMenu" class="menu-link"><i class="fa fa-user"></i> <span>My profile</span></router-link>
                <router-link to="/" @click.native="hideMenu" class="menu-link"><i class="fa fa-cog"></i> <span>Settings</span></router-link>
                <router-link to="/" @click.native="hideMenu" class="menu-link"><i class="fa fa-sign-out"></i> <span>Sign out</span></router-link>
                <router-link to="/" id="show-modal"  @click.native="showmSignMenu" class="menu-link"><i class="fa fa-sign-out"></i> <span>Sign in</span></router-link>
            </div>
        </nav>
        <div v-if="showmodal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div id="login_signup" class="login-page">
                            <div class="form">
                              <form v-if="signUp" class="login-form">
                                <a href="#" class="close" @click="notshow"></a>
                                <h1>Create account </h1>
                                <input type="text" placeholder="username" v-model="newusername"/>
                                <input type="password" placeholder="password" v-model="newpassword"/>
                                <input type="text" placeholder="email address" v-model="newemail"/>
                                <button @click="signup">create</button>
                                <p class="message">Already registered? <a @click="signintemplate()">Sign In</a></p>
                              </form>
                              <form v-if="signIn"class="login-form">
                                <a href="#" class="close"  @click="notshow"></a>
                                <img class="pure-img pure-u-1-2" style="width: 40%"src="/static/images/profile.png">
                                <p></p>
                                <input type="text" placeholder="email" v-model="useremail"/>
                                <input type="password" placeholder="password" v-model="userpassword"/>
                                <button @click="signin">Login</button>
                                <p class="message">Not registered? <a  @click="creatusertemplate()">Create an account</a></p>
                              </form>
                              <form v-if="success" class="login-form">
                                <div class="success-msg" style="color: #1db954">
                                  <i class="fa fa-check"></i>
                                  The account as been created!
                                </div>
                              </form>
                              <form v-if="failure" class="login-form">
                                <div class="error-msg" style="color: #d52929">
                                  <i class="fa fa-times-circle"></i>
                                  An error occured. the account and not been created
                                </div>
                              </form>
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
      showmodal: false,
      signUp: false,
      signIn: false,
      success: false,
      failure: false,
      newusername: '',
      newpassword: '',
      newemail: '',
      useremail: '',
      userpassword: '',
      userId: '',
      token: undefined,
      newuserinfo: {},
      searchAll: ''
    };
  },
  created() {
    this.items = document.getElementsByClassName('menu-link');
    this.token = UsersApi.getToken();
    if (this.token !== undefined) {
      UsersApi.getTokenInfo()
      .then((response) => {
        this.userId = response.id;
      });
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
      this.showmodal = true;
      this.signIn = true;
      this.signUp = false;
      this.success = false;
      this.failure = false;
    },
    signup() {
      SignupApi.postsignup(this.newusername, this.newemail, this.newpassword)
        .then((response) => {
          this.newuserinfo = response;
          if (this.newuserinfo.name === this.newusername) {
            this.signIn = false;
            this.signUp = false;
            this.failure = false;
            this.success = true;
            console.log('sucess');
            setTimeout(this.close, 2000);
          } else {
            this.signUp = false;
            this.failure = true;
            console.log('FAIL');
            setTimeout(this.closefail, 2000);
            this.showmodal = true;
          }
        });
    },
    signin() {
      SignupApi.postlogin(this.useremail, this.userpassword)
      .then((response) => {
        document.cookie = `token=${response.token}`;
        this.token = response.token;
        this.userId = response.id;
        console.log(response);
      });
      setTimeout(this.close, 2000);
    },
    notshow() {
      this.showmodal = false;
    },
    signintemplate() {
      this.signIn = true;
      this.signUp = false;
    },
    creatusertemplate() {
      this.signIn = false;
      this.signUp = true;
    },
    signout() {
      SignupApi.getlogout(this.useremail, this.userpassword);
    },
    closefail() {
      this.failure = false;
      this.signUp = true;
    },
    close() {
      this.showmodal = false;
    },
    submitSearch() {
      // eslint-disable-next-line // cette ligne est SOOO USEFUL <3
      this.$router.push({ name: 'Search', query: { all: this.searchAll } });
    },
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



</style>
