<template>
    <div>
      <h2>Photos in Album "{{ albumTitle }}"</h2>
      <ul>
        <li v-for="photo in photos" :key="photo.id">
          <img :src="photo.thumbnailUrl" alt="Photo Thumbnail" @click="showFullSize(photo.url)" />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['albumId'],
    data() {
      return {
        albumTitle: '',
        photos: []
      };
    },
    async created() {
      try {
        const response = await fetch(`http://localhost:5173/albums/${this.albumId}`);
        const albumData = await response.json();
        this.albumTitle = albumData.title;
        this.photos = albumData.photos; // Adjust this based on your API response structure
      } catch (error) {
        console.error(`Error fetching album ${this.albumId} photos:`, error);
      }
    },
    methods: {
      showFullSize(photoUrl) {
        // Implement logic to show full size photo
      }
    }
  };
  </script>
  
  <style>
  /* Styling for album photos */
  </style>
  