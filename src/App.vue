<template>
  <div>
    <div v-if="!loading">
      <header>
        <div class="button-container">
          <button @click="showPosts">Post</button>
          <button @click="showTodos">Todos</button>
        </div>
      </header>

      <main>
        <div v-if="selectedMenu === 'posts'" class="post-container">
          <select v-model="selectedUser" @change="fetchPosts">
            <option v-for="user in users" :value="user.id">{{ user.name }}</option>
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

        <div v-else-if="selectedMenu === 'todos'">
          <div class="container">
            <h1 style="text-align: center">Task Manager</h1>
            <div style="display: flex">
              <input type="text" v-model="newTask" placeholder="Add new task..." />
              <button @click="addTask">Add</button>
            </div>

            <div
              v-for="(task, index) in incompleteTasks"
              :key="index"
              class="task"
              :class="{ completed: task.completed }"
            >
              <input type="checkbox" v-model="task.completed" class="checkbox" />
              <div v-if="!task.editing" class="task-text">{{ task.title }}</div>
              <div v-else class="edit-mode">
                <input v-model="task.title" class="edit-input" />
                <div class="button-group">
                  <button class="update-btn" @click="updateTask(index)">Update</button>
                  <button class="cancel-btn" @click="cancelTask(index)">Cancel</button>
                </div>
              </div>
              <div v-if="!task.editing" class="button-group">
                <button class="edit-btn" @click="editTask(index)">Edit</button>
                <button class="delete-btn" @click="deleteTask(index)">Delete</button>
              </div>
            </div>

            <button class="filter-btn" @click="showIncomplete = !showIncomplete">
              {{ showIncomplete ? 'Show All Tasks' : 'Show Incomplete Tasks Only' }}
            </button>
          </div>
        </div>
      </main>
    </div>
    <div v-if="loading" class="loading">
      <div class="icons">
        <i class="ri-arrow-left-s-line"></i>
        <i class="ri-arrow-right-s-line"></i>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
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
    }
  },
  methods: {
    async fetchUsers() {
      this.loading = true
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      this.users = await response.json()
      this.loading = false
    },
    async fetchPosts() {
      this.loading = true
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`
      )
      this.userPosts = await response.json()
      this.loading = false
    },
    showTodos() {
      this.selectedMenu = 'todos'
    },
    showPosts() {
      this.selectedMenu = 'posts'
    },
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ title: this.newTask, completed: false, editing: false })
        this.newTask = ''
      }
    },
    cancelTask(index) {
      this.tasks[index].editing = false
    },
    editTask(index) {
      this.tasks[index].editing = true
    },
    updateTask(index) {
      this.tasks[index].editing = false
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
    },
    fetchData() {
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  },
  mounted() {
    this.fetchUsers()
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  computed: {
    incompleteTasks() {
      if (this.showIncomplete) {
        return this.tasks.filter((task) => !task.completed)
      } else {
        return this.tasks
      }
    }
  },
  watch: {
    selectedUser() {
      this.fetchPosts()
    }
  }
}
</script>

<style>
/* Your CSS styles here */
</style>
