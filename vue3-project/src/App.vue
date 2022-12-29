<template>
  <div class="container">
    <h2>To-DO List</h2>
    <input
      v-model="serachText"
      placeholder="search"
      class="form-control"
      type="text"
    />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div>{{ error }}</div>

    <div v-if="!filteredTodos.length">no</div>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo(index)"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import TodoSimpleForm from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'
import axios from 'axios'

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },

  setup() {
    const todos = ref([])
    const error = ref('')

    const getTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos')
        todos.value = res.data
      } catch (err) {
        console.log(err)
        error.value = 'Wrong'
      }
    }
    getTodos()

    const addTodo = async (todo) => {
      error.value = ''
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        })
        todos.value.push(res.data)
      } catch (err) {
        error.value = 'Wrong'
      }
    }

    const deleteTodo = async (index) => {
      error.value = ''
      const id = todos.value[index].id
      try {
        await axios.delete('http://localhost:3000/todos/' + id)
        todos.value.splice(index, 1)
      } catch (err) {
        console.log(err)
        error.value = 'Wrong'
      }
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed
    }

    const serachText = ref('')
    const filteredTodos = computed(() => {
      if (serachText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(serachText.value)
        })
      }
      return todos.value
    })

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      serachText,
      filteredTodos,
      error
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
