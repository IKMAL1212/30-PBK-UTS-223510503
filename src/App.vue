<template>
  <q-layout view="hHh lpR fFf" class="app-layout">
    <q-header class="header">
      <q-toolbar>
        <q-btn-group flat class="route-nav">
          <router-link to="/" exact active-class="active-link">
            <q-btn flat dense :class="isActive('/')">Todos</q-btn>
          </router-link>
          <router-link to="/post" active-class="active-link">
            <q-btn flat dense :class="isActive('/post')">Post</q-btn>
          </router-link>
          <router-link to="/albums" active-class="active-link">
            <q-btn flat dense :class="isActive('/albums')">Albums</q-btn>
          </router-link>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;
    return {
      isActive
    };
  }
};
</script>

<style scoped>
.app-layout {
  background-image: url('../src/assets/gunung.png'); /* Ganti dengan path gambar latar belakang Anda */
  background-size: cover; /* Menyesuaikan ukuran gambar agar mengisi seluruh area */
  background-position: center; /* Posisi gambar latar belakang di tengah-tengah */
  background-repeat: no-repeat; /* Menghindari pengulangan gambar */
}

/* Gaya lainnya */
.header {
  background-color: rgba(221, 144, 51, 0.8); /* Warna latar belakang header dengan transparansi */
  color: #000; /* Warna teks */
  padding: 10px; /* Padding di sekitar header */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow untuk efek elevasi */
  display: flex; /* Mengatur posisi tombol di kanan */
  justify-content: space-between;
}

.route-nav {
  display: flex; /* Menampilkan tombol navigasi dalam baris */
}

.route-nav q-btn {
  font-size: 16px; /* Ukuran font */
  text-transform: uppercase; /* Mengubah teks menjadi huruf kapital */
  transition: color 0.3s; /* Animasi perubahan warna */
  font-weight: bold; /* Menjadikan font tebal */
  margin: 0 10px; /* Memberi jarak antar tombol */
}

.route-nav q-btn:hover {
  color: #ffc0cb; /* Warna teks saat tombol dihover */
}

.q-btn-active {
  color: #ffc0cb; /* Warna teks saat tombol aktif */
  border-bottom: 2px solid #ffc0cb; /* Garis bawah saat tombol aktif */
}

.text-black {
  color: #000; /* Warna teks hitam */
}
</style>

