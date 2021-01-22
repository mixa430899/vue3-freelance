<template>
  <div class="card" v-if="task">
    <h2>{{ task.name }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeTaskStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="changeTaskStatus('done')">Завершить</button>
      <button class="btn danger" @click="changeTaskStatus('cancelled')">Отменить</button>
      <button class="btn danger" @click="deleteTask(task.date)">Удалить</button>
      <hr>
      <button class="btn" @click="$router.push('/')">К списку задач</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id <strong>{{id}}</strong> нет.
  </h3>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  beforeRouteEnter(to, _, next) {
    // если в id не число, редирект на главную
    if(isNaN(Number(to.params.id))) { next({path: '/'}) } 
    else next()
  },
  setup() {
    const route = useRoute(), router = useRouter(), store = useStore()
    const id = Number(route.params.id)
    const task = computed( () => store.getters.task(id) )

    const changeTaskStatus = status => {
      store.dispatch('changeTaskStatus', {id: task.value.date, status})
    }

    const deleteTask = id => {
      if(confirm('Удалить задачу?')) {
        store.dispatch('deleteTask', id)
        router.push('/')
      }
    }

    return { id, task, changeTaskStatus, deleteTask }
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>