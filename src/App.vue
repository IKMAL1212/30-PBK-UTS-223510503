<template>
  <div id="app">
    <ParentComponent @show-posts="showPosts" @show-todos="showTodos">
      <template v-if="selectedMenu === 'posts'">
        <PostsComponent
          :users="users"
          :selectedUser="selectedUser"
          :userPosts="userPosts"
          @fetch-posts="fetchPosts"
        />
      </template>
      <template v-else-if="selectedMenu === 'todos'">
        <TodosComponent
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
      </template>
      <template v-else-if="selectedMenu === 'albums'">
        <router-view></router-view>
      </template>
    </ParentComponent>
  </div>
</template>

<script>
import ParentComponent from './components/ParentComponent.vue';
import PostsComponent from './components/PostsComponent.vue';
import TodosComponent from './components/TodosComponent.vue';

export default {
  components: {
    ParentComponent,
    PostsComponent,
    TodosComponent
  },
  data() {
    return {
      selectedMenu: 'posts',
      todos: [],
      users: [],
      selectedUser: null,
      userPosts: [],
      tasks: [],
      newTask: '',
      showIncomplete: true,
      loading: true
    };
  },
  methods: {
    showPosts() {
      this.selectedMenu = 'posts';
    },
    showTodos() {
      this.selectedMenu = 'todos';
    }
    // Add other methods as needed
  }
};
</script>

<style>
/* Your global styles here */
</style>
