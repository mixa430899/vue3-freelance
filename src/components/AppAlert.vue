<template>
  <div class="alert" :class="type">
    <p class="alert-title">{{title}}</p>
    <p v-if="text">{{text}}</p>
    <button v-if="closable" class="btn" :class="type" @click="$emit('close')">Закрыть</button>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    type: {
      type: String,
      default: 'primary',
      required: false,
      validator(v) {
        return ['primary', 'warning', 'danger'].includes(v)
      }
    },
    title: {
      type: String,
      required: true,
      // заголовок не слишком короткий и не слишком длинный
      validator(v) {
        return v.length > 2 && v.length < 55
      }
    },
    closable: {
      type: Boolean,
      default: false,
      required: false
    },
    text: {
      type: String,
      required: false
    }
  }
}
</script>