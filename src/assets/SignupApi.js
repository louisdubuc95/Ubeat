import Vue from 'vue';

export default class SignupApi {
  static postsignup(newname, newemail, newpassword) {
    try {
      const post = Vue.http.post('signup', { name: newname, email: newemail, password: newpassword })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          return response.status;
        });
      return post;
    } catch (e) {
      return 'Erreur';
    }
  }
  static postlogin(useremail, userpassword) {
    return Vue.http.get('login', { email: useremail, password: userpassword })
      .then(response => response.json());
  }
  static getlogout(usermail, userpassword) {
    return Vue.http.get('logout', { email: usermail, password: userpassword })
      .then(response => response.json());
  }
}
