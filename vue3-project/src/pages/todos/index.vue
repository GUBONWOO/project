<template>
  <div>
    <h2>To-DO List</h2>
    <input
      v-model="searchText"
      placeholder="Search"
      class="form-control"
      type="text"
      @keyup.enter="searchTodo"
    />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ error }}</div>

    <div v-if="!todos.length">no</div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(currentPage - 1)"
          >
            Previous
          </a>
        </li>

        <li
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(page)"
            >{{ page }}</a
          >
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(currentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import TodoSimpleForm from '@/components/TodoSimpleForm.vue'
import TodoList from '@/components/TodoList.vue'
import axios from 'axios'
export default {
  components: {
    TodoSimpleForm,
    TodoList
  },

  setup() {
    const todos = ref([])
    const error = ref('')
    const numberOfTodos = ref(0)
    const limit = 5
    const currentPage = ref(1)

    const searchText = ref('')

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit)
    })
    // const a = reactive({
    //   b: 1
    // })
    // watchEffect(() => {
    //   console.log(a.b)
    // })
    // a.b = 4

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        )
        numberOfTodos.value = res.headers['x-total-count']
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
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        })

        getTodos(1)
      } catch (err) {
        error.value = 'Wrong'
      }
    }

    const deleteTodo = async (index) => {
      error.value = ''
      const id = todos.value[index].id
      try {
        await axios.delete('http://localhost:3000/todos/' + id)

        getTodos(1)
      } catch (err) {
        console.log(err)
        error.value = 'Wrong'
      }
    }

    const toggleTodo = async (index, checked) => {
      error.value = ''
      const id = todos.value[index].id
      try {
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: checked
        })
        todos.value[index].completed = checked
      } catch (err) {
        console.log(err)
        error.value = 'Wrong'
      }
    }

    let timeout = null
    const searchTodo = () => {
      clearTimeout(timeout)
      getTodos(1)
    }
    watch(searchText, () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        getTodos(1)
      }, 2000)
    })

    return {
      searchTodo,
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      // filteredTodos,
      error,
      numberOfPages,
      currentPage,
      getTodos
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
