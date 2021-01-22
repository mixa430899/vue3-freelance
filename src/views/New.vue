<template>
  <form class="card" @submit.prevent="send">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="name">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>


<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const name = ref('')
    const date = ref(null)
    const description = ref('')

    const store = useStore()
    const router = useRouter()

    function send() {
      const timestamp = new Date(date.value).getTime()
      let status = 'active'
      // если дедлайн задачи в прошлом, ставим статус отмены
      if(timestamp + (86400 * 1000) < new Date().getTime()) status = 'cancelled'
      const newTask = { name: name.value, date: timestamp, description: description.value, status}
      store.dispatch('addTask', newTask)
      router.push('/')
    }

    const isValid = computed( () => name.value.length > 2 && date.value && description.value.length > 5 )

    return {
      name, date, description, send, isValid
    }
  }
}
</script>