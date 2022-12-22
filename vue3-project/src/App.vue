<template>
  <div class="container">
    <div v-if="toggle">true</div>
    <div v-else>false</div>
    <button @click="onToggle">Toggle</button>
    <h2>To-DO List</h2>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1">
          <input
            v-model="todo"
            placeholder="Type new to-do"
            class="form-control"
            type="text"
          />
        </div>
        <div>
          <button type="sumbit" class="btn btn-primary">Add</button>
        </div>
      </div>
      <div v-show="hasError" style="color: red">This field cannot be empty</div>
    </form>
    <div v-for="todo in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todo.completed"
          />
          <label class="form-check-label" :class="{ todo: todo.completed }">
            {{ todo.subject }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }
    const toggle = ref(false)
    const todo = ref('')
    const todos = ref([])
    const hasError = ref(false)
    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false
        })
        hasError.value = false
      }
    }

    const onToggle = () => {
      toggle.value = !toggle.value
    }
    return {
      todo,
      todos,
      onSubmit,
      toggle,
      onToggle,
      hasError,
      todoStyle
    }
  }
}
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
