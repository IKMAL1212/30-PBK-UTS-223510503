<template>
  <div class="AlbumDetails-container">
    <h2 class="title">Pilih Album:</h2>
    <select v-model="selectedAlbum" @change="fetchPhotos" class="select-album">
      <option disabled value="">Silakan pilih album</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.title }}</option>
    </select>
    <h2 class="title">Foto di Album {{ selectedAlbum }}</h2>
    <div class="photos-container">
      <table v-if="photos.length" class="photos-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Judul</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="photo in photos" :key="photo.id">
            <td>
              <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" class="thumbnail">
            </td>
            <td>{{ photo.title }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-photos">
        <p>Tidak ada foto tersedia.</p>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAlbumsStore } from '../stores/AlbumStore';

const router = useRouter();
const selectedAlbum = ref(null);
const albums = ref([]);
const photos = ref([]);

const albumsStore = useAlbumsStore();

const fetchAlbums = async () => {
  try {
    await albumsStore.fetchAlbums();
    albums.value = albumsStore.albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

const fetchPhotos = async () => {
  if (selectedAlbum.value) {
    try {
      await albumsStore.fetchPhotos(selectedAlbum.value);
      photos.value = albumsStore.photos;
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }
};

const showPhoto = (url) => {
  window.open(url, '_blank');
};

onMounted(() => {
  fetchAlbums();
});

watch(selectedAlbum, (newAlbum) => {
  if (newAlbum) {
    fetchPhotos();
    router.push(`/albums/${newAlbum}`);
  }
});
</script>


<style scoped>
.AlbumDetails-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
}

.title {
  color: #000;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
}

.select-album {
  margin: 0 auto;
  display: block;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: center;
}

.photos-container {
  margin-top: 20px;
  text-align: center;
}

.photos-table {
  margin: 0 auto;
  width: 100%;
  border-collapse: collapse;
}

.photos-table th, .photos-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.thumbnail:hover {
  border-color: #007bff;
}

.no-photos {
  text-align: center;
  margin-top: 20px;
}

.no-photos p {
  font-size: 18px;
  color: #000;
}
</style>
