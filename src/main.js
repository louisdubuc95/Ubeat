import Vue from 'vue';
import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';
import App from './App';
import router from './router';

Vue.use(VueCookie);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = 'http://ubeat.herokuapp.com/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
