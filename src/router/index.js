import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Artist from '@/components/artist/Artist';
import Album from '@/components/album/Album';
import Playlists from '@/components/playlists/Playlists';

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
      path: '/album/:id',
      name: 'Album',
      component: Album
    }, {
      path: '/playlists',
      name: 'Playlist',
      component: Playlists
    }
  ],
});
