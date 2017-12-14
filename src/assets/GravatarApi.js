import Vue from 'vue';
import md5 from 'md5';

export default class GravatarApi {
  static getAvatar(email) {
    const emailMd5 = md5(email);
    const images = ['mm', 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash'];
    let defaultChoice = images[((Math.random() * 10) % 6).toFixed(0)];
    defaultChoice = defaultChoice === undefined ? images[0] : defaultChoice;
    return Vue.http.get(`https://www.gravatar.com/avatar/${emailMd5}?d=${defaultChoice}`)
      .then(response => response.url);
  }
}
