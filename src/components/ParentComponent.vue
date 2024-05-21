<template>
    <div class="post-container">
      <select v-model="selectedUser" @change="fetchPosts">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <div class="table-container">
        <table class="post-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Isi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in userPosts" :key="post.id">
              <td>
                <strong>{{ post.title }}</strong>
              </td>
              <td>{{ post.body }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['users', 'selectedUser', 'userPosts'],
    methods: {
      fetchPosts() {
        this.$emit('fetch-posts');
      }
    }
  }
  </script>
  