import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Artist from '@/components/artist/Artist';
import Album from '@/components/album/Album';
import Playlists from '@/components/playlists/Playlists';
import Profile from '@/components/profile/Profile';
import Search from '@/components/search/Search';

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
    }, {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    }, {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ],
});
