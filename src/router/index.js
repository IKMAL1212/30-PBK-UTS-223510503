import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlbumsView from '../views/AlbumsView.vue';
import AlbumPhotosView from '../views/AlbumPhotosView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
    {
      path: '/albums',
      name: 'albums',
      component: AlbumsView
    },
    {
      path: '/albums/:albumId',
      name: 'album-photos',
      component: AlbumPhotosView,
      props: true
    }
  ]
})

export default router
