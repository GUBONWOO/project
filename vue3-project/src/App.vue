<template>
  <div class="name">{{ name }}</div>
  <button class="btn btn-primary" @click="update">Clcik</button>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const name = ref(' Koo coder')

    // const greeting = (name) => {
    //   return ' hello,' + name
    // }
    const update = () => {
      name.value = 'ko ssie '
      console.log(name)
    }
    return {
      name,
      update
    }
  }
}
</script>

<style>
.name {
  color: red;
}
</style>
