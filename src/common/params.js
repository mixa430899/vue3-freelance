export const badgesTypes = {
  active: { class: 'primary', text: 'Активен' },
  done: { class: 'primary', text: 'Завершен' },
  cancelled: { class: 'danger', text: 'Отменен' },
  pending: { class: 'warning', text: 'Выполняется' }
}

// позволит статичным таскам оставаться на месте при перезагрузке через F5 если localStorage
// не был проинициализирован
const todayMidnightTimestamp = new Date(new Date(Date.now()).toLocaleDateString()).getTime()
// some static tasks for app
export const mockTasks = [
  { 
    name: 'Сделать курсовую к блоку 3', 
    status: 'done', 
    description: 'Описание 1', 
    date: todayMidnightTimestamp 
  },
  { 
    name: 'Дождаться ревью курсовой', 
    status: 'pending', 
    description: 'Описание 2', 
    date: todayMidnightTimestamp + (86400 * 1000)
  },
  { 
    name: 'Начать практический блок', 
    status: 'cancelled', 
    description: 'Описание 3', 
    date: todayMidnightTimestamp + (86400 * 1000 * 2)
  }
]