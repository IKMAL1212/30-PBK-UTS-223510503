import { createRouter, createWebHistory } from 'vue-router';
import PostComponent from '../components/PostComponent.vue';
import TodosComponent from '../components/TodosComponent.vue';
import AlbumsComponent from '../views/AlbumsComponent.vue'; // Pastikan path sesuai dengan struktur direktori Anda

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: TodosComponent,
  },
  {
    path: '/post',
    name: 'Post',
    component: PostComponent,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: AlbumsComponent, // Gunakan komponen AlbumsComponent yang sudah di-import
  },
  {
    path: '/albums/:id',
    name: 'AlbumDetail',
    component: AlbumsComponent, // Juga menggunakan komponen AlbumsComponent untuk detail album
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
