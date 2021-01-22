<template>
  <span :class="['badge', badgeClass]">{{badgeText}}</span>
</template>

<script>
import { computed } from 'vue'
import { badgesTypes } from '../common/params'

export default {
  props: {
    type: {
      type: String,
      validator(v) {
        return Object.keys(badgesTypes).includes(v)
      }
    }
  },
  setup(props) {
    return {
      badgeClass: computed( () => badgesTypes[props.type].class ),
      badgeText: computed( () => badgesTypes[props.type].text )
    }
  }
}
</script>