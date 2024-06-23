<template>
  <div class="main-container">
    <nav class="navbar">
      <ul class="nav-list">
        <li :class="{ active: selectedMenu === 'todos' }">
          <router-link to="/todos" class="nav-link" @click.native="showTodos">Todos</router-link>
        </li>
        <li :class="{ active: selectedMenu === 'posts' }">
          <router-link to="/posts" class="nav-link" @click.native="showPosts">Posts</router-link>
        </li>
        <li :class="{ active: selectedMenu === 'albums' }">
          <router-link to="/albums" class="nav-link" @click.native="showAlbums">Albums</router-link>
        </li>
      </ul>
    </nav>

    <div class="content">
      <router-view v-if="!selectedMenu"></router-view>
      <PostsComponent
        v-else-if="selectedMenu === 'posts'"
        :users="users"
        :selectedUser="selectedUser"
        :userPosts="userPosts"
        @fetch-posts="fetchPosts"
      />
      <TodosComponent
        v-else-if="selectedMenu === 'todos'"
        :tasks="tasks"
        :newTask="newTask"
        :incompleteTasks="incompleteTasks"
        :showIncomplete="showIncomplete"
        @add-task="addTask"
        @cancel-task="cancelTask"
        @edit-task="editTask"
        @update-task="updateTask"
        @delete-task="deleteTask"
      />
      <AlbumsComponent
        v-else-if="selectedMenu === 'albums'"
        :albums="albums"
        :newAlbum="newAlbum"
        @add-album="addAlbum"
        @edit-album="editAlbum"
        @update-album="updateAlbum"
        @cancel-album="cancelAlbum"
        @delete-album="deleteAlbum"
      />
    </div>

    <!-- Animasi teks Selamat Datang -->
    <div class="welcome-text" v-if="!selectedMenu">Selamat Datang Bos Quu :)</div>

    <!-- Animasi teks Silakan Pilih -->
    <div class="choose-text" v-if="!selectedMenu">Silakan Klik Menu Diatas</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PostsComponent from './components/PostsComponent.vue';
import TodosComponent from './components/TodosComponent.vue';
import AlbumsComponent from './views/Albums.vue';

const selectedMenu = ref('');

const users = ref([]);
const selectedUser = ref(null);
const userPosts = ref([]);
const tasks = ref([]);
const newTask = ref('');
const incompleteTasks = ref([]);
const showIncomplete = ref(true);

const albums = ref([]);
const newAlbum = ref('');

const showAlbums = () => { selectedMenu.value = 'albums'; };
const showPosts = () => { selectedMenu.value = 'posts'; };
const showTodos = () => { selectedMenu.value = 'todos'; };

const addTask = () => {
  // Definisi logika untuk addTask
};

const cancelTask = () => {
  // Definisi logika untuk cancelTask
};

const editTask = () => {
  // Definisi logika untuk editTask
};

const updateTask = () => {
  // Definisi logika untuk updateTask
};

const deleteTask = () => {
  // Definisi logika untuk deleteTask
};

const addAlbum = () => {
  if (newAlbum.value.trim() !== '') {
    albums.value.push({ title: newAlbum.value, editing: false });
    newAlbum.value = '';
  }
};

const cancelAlbum = (index) => {
  albums.value[index].editing = false;
};

const editAlbum = (index) => {
  albums.value[index].editing = true;
};

const updateAlbum = (index) => {
  albums.value[index].editing = false;
};

const deleteAlbum = (index) => {
  albums.value.splice(index, 1);
};

// Method to fetch posts
const fetchPosts = () => {
  // Example implementation (replace with your actual fetching logic)
  console.log('Fetching posts...');
  // Assume posts are fetched and stored in `userPosts`
  userPosts.value = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    // Add more posts as needed
  ];
};
</script>

<style scoped>
.main-container {
  background-image: url('../src/assets/gunung.png'); /* Path ke gambar background */
  background-size: cover; /* Menutupi seluruh area background */
  background-position: center; /* Posisi gambar di tengah-tengah */
  min-height: 100vh; /* Tinggi minimum halaman */
  display: flex;
  flex-direction: column;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(238, 180, 93);
  z-index: 1000;
  display: flex;
  justify-content: center; /* Menengahkan navbar */
}

.nav-list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-list li {
  flex: 1;
}

.nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 20px;
  text-decoration: none;
  color: black;
  position: relative; /* Menambahkan posisi relatif untuk animasi */
}

.nav-link:hover {
  background-color: #e2e2e2; /* Warna latar saat hover */
}

.active .nav-link {
  background-color: #e6e6e6; /* Warna latar saat item aktif */
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%; /* Posisi awal tengah */
  width: 0;
  height: 3px; /* Tinggi garis animasi */
  background-color: #000; /* Warna garis animasi */
  transition: width 0.3s ease-out, left 0.3s ease-out; /* Transisi lebar dan posisi */
}

.nav-link:hover::before {
  width: 100%; /* Lebar garis saat hover */
  left: 0; /* Posisi garis saat hover */
}

.content {
  margin-top: 50px;
}


.welcome-text,
.choose-text {
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 36px;
  margin-top: 20px;
  opacity: 0;
  animation: fadeInUp 1s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
