<template>
    <div>
      <header>
        <div class="button-container">
          <button @click="showPosts">Post</button>
          <button @click="showTodos">Todos</button>
        </div>
      </header>
      <main>
        <slot></slot> <!-- Slot untuk menempatkan komponen Posts atau Todos -->
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
  }
  </script>
  