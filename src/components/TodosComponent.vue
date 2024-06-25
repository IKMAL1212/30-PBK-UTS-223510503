<template>
  <div class="container">
    <h2 class="title">Daftar Tugas</h2>
    <div class="add-task">
      <input type="text" v-model="newTask" placeholder="Tambahkan tugas baru..." class="task-input">
      <q-btn @click="addTask" label="Tambah" class="add-btn" />
    </div>

    <div v-if="tasks.length === 0" class="no-tasks">
      <p>Tidak ada tugas yang ditambahkan.</p>
    </div>

    <div v-for="(task, index) in filteredTasks" :key="index" class="task" :class="{ 'completed': task.completed }">
      <q-checkbox v-model="task.completed" class="checkbox" @change="completeTask(index)">
        <div v-if="!task.editing" class="task-text">{{ task.title }}</div>
        <div v-else class="edit-mode">
          <q-input v-model="task.title" class="edit-input" dense />
          <div class="button-group">
            <q-btn @click="updateTask(index)" label="Simpan" />
            <q-btn @click="cancelTask(index)" label="Batal" />
          </div>
        </div>
      </q-checkbox>
      <div class="button-group">
        <q-btn v-if="!task.editing" @click="editTask(index)" icon="edit" flat />
        <q-btn @click="deleteTask(index)" icon="delete" flat />
      </div>
    </div>

    <q-btn class="filter-btn" @click="toggleShowIncomplete" :label="showIncomplete ? 'Tampilkan semua tugas' : 'Tampilkan hanya tugas yang belum selesai'" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tasks = ref([
  { title: 'Vue Js', completed: true, editing: false },
  { title: 'Api', completed: true, editing: false },
  { title: 'Pinia', completed: false, editing: false },
]);

const newTask = ref('');
const showIncomplete = ref(true);

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push({ title: newTask.value, completed: false, editing: false });
    newTask.value = '';
  }
};

const cancelTask = (index) => {
  tasks.value[index].editing = false;
};

const editTask = (index) => {
  tasks.value[index].editing = true;
};

const updateTask = (index) => {
  tasks.value[index].editing = false;
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

const completeTask = (index) => {
  tasks.value[index].completed = !tasks.value[index].completed;
};

const toggleShowIncomplete = () => {
  showIncomplete.value = !showIncomplete.value;
};

const filteredTasks = computed(() => {
  if (showIncomplete.value) {
    return tasks.value.filter(task => !task.completed);
  } else {
    return tasks.value;
  }
});

</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
}

.add-task {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-btn {
  margin-left: 10px;
}

.task {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}

.completed {
  text-decoration: line-through;
}

.checkbox {
  flex: 1;
  display: flex;
  align-items: center;
}

.task-text {
  flex: 1;
  color: #333;
}

.edit-mode {
  display: flex;
  align-items: center;
}

.edit-input {
  flex: 1;
  margin-right: 10px;
}

.button-group {
  margin-left: 10px;
}

.filter-btn {
  background-color: #d29d3a;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
}

.filter-btn:hover {
  background-color: #bfa06d;
}

.no-tasks {
  text-align: center;
  margin-top: 20px;
}

.no-tasks p {
  font-size: 18px;
}
</style>
