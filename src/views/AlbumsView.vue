<template>
    <div>
      <h1>Albums</h1>
      <ul>
        <li v-for="album in albums" :key="album.id">
          <router-link :to="'/albums/' + album.id">{{ album.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        albums: []
      };
    },
    async created() {
      try {
        const response = await fetch('http://localhost:5173/albums');
        this.albums = await response.json();
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    }
  };
  </script>
  
  <style>
  /* Styling for albums list */
  </style>
  