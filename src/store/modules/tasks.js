import { storage } from '../../common/utils'
import { mockTasks } from '../../common/params'

export default {
  // we have simple app so no need in namespacing
  // namespaced: true,
  state() {
    return {
      // моковые данные будут взяты если в localStorage нет ключа tasks
      tasks: storage('tasks') || mockTasks
    }
  },
  // mutations must be sync
  mutations: {
    ADD_TASK(state, payload) {
      state.tasks = [ ...state.tasks, payload ]
    },
    CHANGE_TASK_STATUS(state, {id, status}) {
      state.tasks = state.tasks.map((task) => {
        if(task.date === id) return { ...task, status }
        return task
      })
    },
    DELETE_TASK(state, idx) {
      state.tasks.splice(idx, 1)
    }
  },
  actions: {
    addTask({state, commit}, payload) {
      storage('tasks', [...state.tasks, payload])
      commit('ADD_TASK', payload)
    },
    changeTaskStatus({state, commit}, {id, status}) {
      storage('tasks', state.tasks.map((task) => {
        if(task.date === id) return { ...task, status }
        return task
      }))
      commit('CHANGE_TASK_STATUS', {id, status})
    },
    deleteTask({state, commit}, id) {
      storage('tasks', state.tasks.filter(task => task.date !== id))
      commit('DELETE_TASK', state.tasks.findIndex(task => task.date === id))
    }
  },
  getters: {
    allTasks(state) {
      return state.tasks
    },
    task: (state) => (id) => {
      return state.tasks.find(task => task.date === id)
    },
    filteredTasksByStatus: (state) => (types) => {
      return state.tasks.filter(task => types.includes(task.status))
    },
    tasksCount(state) {
      return state.tasks.length
    },
    activeTasksCount(state) {
      return state.tasks.filter(t => t.status === 'active').length
    }
  }
}