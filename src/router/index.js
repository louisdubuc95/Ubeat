import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Album from '@/components/Album';
import Artist from '@/components/artist/Artist';
import Playlist from '@/components/Playlists';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/artist/:id',
      name: 'Artist',
      component: Artist
    }, {
      path: '/album',
      name: 'Album',
      component: Album
    }, {
      path: '/playlists',
      name: 'Playlist',
      component: Playlist
    }
  ],
});
