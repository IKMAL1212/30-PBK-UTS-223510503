<template>
  <div class="task-manager">
    <h1>Tambahkan Kegiatan</h1>
    <div class="add-task">
      <input type="text" v-model="newTask" placeholder="Masukkan Nama Kegiatan">
      <button @click="addTask">Tambah</button>
    </div>

    <div v-for="(task, index) in incompleteTasks" :key="index" class="task" :class="{ 'completed': task.completed }">
      <input type="checkbox" v-model="task.completed" class="checkbox">
      <div v-if="!task.editing" class="task-text">{{ task.title }}</div>
      <div v-else class="edit-mode">
        <input v-model="task.title" class="edit-input">
        <div class="button-group">
          <button class="update-btn" @click="updateTask(index)">Update</button>
          <button class="cancel-btn" @click="cancelTask(index)">Cancel</button>
        </div>
      </div>
      <div class="button-group" v-if="!task.editing">
        <button class="edit-btn" @click="editTask(index)">Edit</button>
        <button class="delete-btn" @click="deleteTask(index)">Hapus</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: '',
      showIncomplete: true
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ title: this.newTask, completed: false });
        this.newTask = '';
      }
    },
    cancelTask(index) {
      this.tasks[index].editing = false;
    },
    editTask(index) {
      this.tasks[index].editing = true;
    },
    updateTask(index) {
      this.tasks[index].editing = false;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  },
  computed: {
    incompleteTasks() {
      return this.showIncomplete ? this.tasks.filter(task => !task.completed) : this.tasks;
    }
  }
};
</script>

<style scoped>
.task-manager {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
}

.add-task {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.add-task input[type="text"] {
  flex: 1;
  margin-right: 10px;
}

.task {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task input[type="checkbox"] {
  margin-right: 10px;
}

.completed .task-text {
  text-decoration: line-through;
}

.edit-mode input {
  width: calc(100% - 70px);
}

.button-group button {
  margin-right: 5px;
}
</style>
