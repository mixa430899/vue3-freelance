<template>
  <h1 class="text-white center" v-if="tasksCount === 0">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{activeTasksCount}}</h3>
    <p class="text-white">Показывать таски с меткой:
      <label v-for="key in Object.keys(badgesTypes)" :key="key" :class="badgesTypes[key].class">
      <input type="checkbox" 
        name="tasks" 
        v-model="filterTypes"
        :value="key"
      >{{badgesTypes[key].text}}</label>
    </p>
    <div class="card" v-for="task in tasks" :key="task.name" >
      <h2 class="card-title">
        {{task.name}}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.date).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="$router.push(`/task/${task.date}`)">Посмотреть</button>
      <button class="btn danger" @click="deleteTask(task.date)">Удалить</button>
    </div>
  </template>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { badgesTypes } from '../common/params'
import AppStatus from '../components/AppStatus'

export default {
  setup() {
    const store = useStore()
    // массив типов для фильтрации таксов
    const filterTypes = ref(Object.keys(badgesTypes))

    const tasksCount = computed( () => store.getters.tasksCount )
    const activeTasksCount = computed( () => store.getters.activeTasksCount )

    const tasks = computed( () => store.getters.filteredTasksByStatus(Object.values(filterTypes.value)) )

    const deleteTask = id => {
      if(confirm('Удалить задачу?')) store.dispatch('deleteTask', id)
    }

    return { tasks, tasksCount, activeTasksCount, deleteTask, badgesTypes, filterTypes }
  },
  components: {AppStatus}
}
</script>