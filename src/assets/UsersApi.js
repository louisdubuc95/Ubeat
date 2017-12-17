import Vue from 'vue';
import router from '@/router';

export default class UsersApi {

  static getToken() {
    const sep = document.cookie.split(';');
    for (let i = 0; i < sep.length; i += 1) {
      let c = sep[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf('token=') === 0) {
        return c.substring(6, c.length);
      }
    }
    return '';
  }

  // redirection vers la page d'accueil, l'utilisateur n'a pas les droits d'accès
  static unauthorized(reject) {
    if (reject.status === 401) {
      Vue.cookie.delete('token');
      router.push({ name: 'Home' });
    }
  }

  static getUsers() {
    return Vue.http.get('users', { headers: { authorization: this.getToken() } })
      .then(response => response.json(), this.unauthorized);
  }

  static getUser(id) {
    return Vue.http.get(`users/${id}`, { headers: { authorization: this.getToken() } })
      .then(response => response.json(), this.unauthorized);
  }

  static getTokenInfo(token) {
    return Vue.http.get('tokenInfo', { headers: { authorization: token } })
      .then(response => response.json(), this.unauthorized);
  }


  static follow(userId) {
    return Vue.http.post('follow',
      { id: userId },
      { headers: { authorization: this.getToken() } })
      .then(response => response.json(), this.unauthorized);
  }

  static stopFollow(id) {
    return Vue.http.delete(`follow/${id}`, { headers: { authorization: this.getToken() } })
      .then(response => response.json(), this.unauthorized);
  }
}
