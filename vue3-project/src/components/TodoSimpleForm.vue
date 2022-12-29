<template>
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
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['add-todo'],
  setup(props, { emit }) {
    const todo = ref('')
    const hasError = ref(false)

    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true
      } else {
        emit('add-todo', {
          id: Date.now(),
          subject: todo.value,
          completed: false
        })
        hasError.value = false
        todo.value = ''
      }
    }
    return {
      todo,
      hasError,
      onSubmit
    }
  }
}
</script>

<style></style>
