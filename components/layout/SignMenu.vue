<template>
  <div>
  <v-menu
    v-if="profilImage !== null"
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
        class="rounded-circle"
        :src="require('../../static/sharaloc.svg')"
        max-width="48"
        max-height="48"
        contain
        v-bind="attrs"
        v-on="on"
      />
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in menuItems.filter(e => e.connected === $store.state.session.currentUser.authenticated)"
        :key="i"
        :to="item.to"
        style="border-bottom: 1px solid lightgrey"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
    <v-menu
      v-else
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
        <v-icon x-large
                v-bind="attrs"
                v-on="on">
          mdi-account-circle
        </v-icon>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems.filter(e => e.connected === $store.state.session.currentUser.authenticated)"
          :key="i"
          :to="item.to"
          style="border-bottom: 1px solid lightgrey"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "SignMenu",
  props: ['profilImage'],
  data:() => {
    return {
      menuItems: [
        {
          title: "Connexion",
          to: "/Connexion",
          connected: false
        },
        {
          title: "Inscription",
          to: "/Inscription",
          connected: false
        },
        {
          title: "Mes Voyages",
          to: "/Voyages",
          connected: true
        },
        {
          title: "Mon Compte",
          to: "/compte",
          connected: true
        },
        {
          title: "Déconnexion",
          to: "/deconnexion",
          connected: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
