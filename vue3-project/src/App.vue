<template>
  <div class="container">
    <h2>To-DO List</h2>
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!todos.length">no</div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo(index)"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import TodoSimpleForm from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'
export default {
  components: {
    TodoSimpleForm,
    TodoList
  },

  setup() {
    const todos = ref([])

    const addTodo = (todo) => {
      todos.value.push(todo)
    }
    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed
    }
    const deleteTodo = (index) => {
      todos.value.splice(index, 1)
    }

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo
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
