<template>
  <v-app fixed app>

    <v-main ref="main">
      <v-container fluid class="pa-0">
        <NotificationListe />
        <overlay v-model="overlay" />
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      fixed
      app>
      <span>{{ name }} &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
import Overlay from "@/components/global/Overlay";
import NotificationListe from "@/components/global/NotificationListe";

export default {
  name: "Empty",
  components: {
    NotificationListe,
    Overlay
  },
  data() {
    return {
      overlay: false,
      name: 'Sharaloc'
    }
  },
  created() {
    this.$nuxt.$on('overlay', (val) => {
      this.overlay = val
    })
  },
}
</script>
