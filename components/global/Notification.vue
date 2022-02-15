<template>
  <v-alert
    :type="notification.err === null ? 'warning' : notification.err === true ? 'error' : 'success'"
    border="top"
    dismissible
    transition="slide-x-reverse-transition"
  >
    {{ notification.message }}

    <template #close="{ }">
      <v-icon
        class="ml-2"
        @click="() => { closeAlert()}"
      >
        mdi-close-circle
      </v-icon>
    </template>
  </v-alert>
</template>

<script>
export default {
  name: "Notification",
  props: {
    notification: {
      type: Object,
      default() {
        return {
          err: true,
          message: 'Empty'
        }
      }
    },
    closePopUp: {
      type: Function,
      default() {
        return () => {}
      }
    },
  },
  created() {
    setTimeout(() => this.closeAlert(), 5000)
  },
  methods: {
    closeAlert() {
      this.$emit('close-pop-up')
    }
  }

}
</script>

<style scoped lang="scss">
.v-alert {
  margin-bottom: 0;
  z-index: 100000000
}
</style>
