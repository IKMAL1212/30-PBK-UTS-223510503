<template>
    <div>
      <div class="container">
        <h1 style="text-align: center">Task Manager</h1>
        <div style="display: flex">
          <input type="text" v-model="newTask" placeholder="Add new task..." />
          <button @click="addTask">Add</button>
        </div>
  
        <div v-for="(task, index) in incompleteTasks" :key="index" class="task" :class="{ completed: task.completed }">
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
  </template>
  
  <script>
  export default {
    props: ['tasks', 'newTask', 'incompleteTasks', 'showIncomplete'],
    methods: {
      addTask() {
        this.$emit('add-task', this.newTask);
        this.newTask = '';
      },
      cancelTask(index) {
        this.$emit('cancel-task', index);
      },
      editTask(index) {
        this.$emit('edit-task', index);
      },
      updateTask(index) {
        this.$emit('update-task', index);
      },
      deleteTask(index) {
        this.$emit('delete-task', index);
      }
    }
  }
  </script>
  