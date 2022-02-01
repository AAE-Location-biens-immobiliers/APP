<template>
  <v-list>
    <v-list-item
      v-for="(notif, i) in notifications"
      :key="i"
    >
      <v-list-item-content>
        <Notification
          :notification="notif"
          @close-pop-up="closeN(notif)"
        />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import Notification from "@/components/global/Notification";

export default {
  name: "NotificationListe",
  components: {
    Notification
  },
  data() {
    return {
      notifications: []
    }
  },
  created() {
    this.$nuxt.$on('notification', (err, message) => {
      this.notifications.push({
        err,
        message
      })
    })
  },
  methods: {
    closeN(n) {
      this.notifications = this.notifications.filter(e => e !== n)
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="scss">
.v-list {
  overflow: auto;
  position: fixed;
  right: 0;
  margin-right: 2%;
  z-index: 100;
  max-width: 300px;
  max-height:75vh;
  background-color: transparent;

  &::-webkit-scrollbar {
    display: none;
  }
}

.v-list-item__content {
  padding-bottom: 0;
}
</style>
