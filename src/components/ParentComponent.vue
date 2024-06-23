<template>
  <div>
    <header>
      <div class="button-container">
        <button @click="showPosts">Posts</button>
        <button @click="showTodos">Todos</button>
        <router-link to="/albums">Albums</router-link>
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    showTodos() {
      this.$emit('show-todos');
    },
    showPosts() {
      this.$emit('show-posts');
    }
  }
};
</script>

<style>
/* Styling for parent component */
</style>
