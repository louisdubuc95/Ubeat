import Vue from 'vue';

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

  static getUsers() {
    return Vue.http.get('users', { headers: { authorization: this.getToken() } })
      .then(response => response.json());
  }

  static getUser(id) {
    return Vue.http.get(`users/${id}`, { headers: { authorization: this.getToken() } })
      .then(response => response.json());
  }

  static getTokenInfo() {
    return Vue.http.get('tokenInfo', { headers: { authorization: this.getToken() } })
      .then(response => response.json());
  }

  static searchUsers(query) {
    return Vue.http.get(`search/users?q=${query}`, { headers: { authorization: this.getToken() } })
      .then(response => response.json());
  }

  static follow(userId) {
    return Vue.http.post('follow',
      { id: userId },
      { headers: { authorization: this.getToken() } })
      .then(response => response.json());
  }

  static stopFollow(id) {
    return Vue.http.delete(`follow/${id}`, { headers: { authorization: this.getToken() } })
      .then(response => response.json());
  }
}
