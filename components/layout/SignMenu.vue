<template>
  <v-menu

    bottom
    left
    origin="center center"
    transition="scale-transition"
    nudge-left="-48"
    nudge-bottom="35"
  >
    <template #activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        v-on="on">
        mdi-menu
      </v-icon>
      <v-img
        v-if="profilImage !== null"
        class="rounded-circle"
        :src="require('../../static/sharaloc.svg')"
        max-width="48"
        max-height="48"
        contain
        v-bind="attrs"
        v-on="on"
      />
      <v-icon v-else
              x-large
              v-bind="attrs"
              v-on="on">
        mdi-account-circle
      </v-icon>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        style="border-bottom: 1px solid lightgrey"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "SignMenu",
  props: [
    'profilImage'
  ],
  data:() => {
    return {
      menuItems: [
        {
          title: "Connexion",
          connected: false,
          to: '/connexion'
        },
        {
          title: "Inscription",
          connected: false,
          to: '/inscription'
        },
        {
          title: "Mes voyages",
          connected: true,
          to: '/voyages',
          locataire: true
        },
        {
          title: "Mes annonces",
          connected: true,
          to: '/annonces',
          locataire: false
        },
        {
          title: "Mon profil",
          connected: true,
          to: '/profil'
        },
        {
          title: "Déconnexion",
          connected: true,
          to: '/deconnexion'
        }
      ]
    }
  },
  computed: {
    items() {
      const auth = this.$store.state.session.authenticated
      const i = this.menuItems.filter(e => e.connected === auth)
      return auth === true ? i.filter(e => e.locataire === this.$store.state.session.currentUser.locataire || !('locataire' in e)) : i
    }
  },
}
</script>

<style scoped>

</style>
