<template>
  <v-img
    :src="require('./../static/Background.jpeg')"
  >
    <v-container fluid class=" justify-center" fill-height>
      <v-card color="secondary" min-width="400">

        <v-card-title>
          Portail
        </v-card-title>

        <v-card-subtitle>
          Vous avez été déconnecté
        </v-card-subtitle>

          <v-divider />

          <v-card-actions>
            <v-btn color="primary" elevation="2" outlined rounded @click="$router.push('/connexion')">
              <v-icon left>
                mdi-fingerprint
              </v-icon>
              Connexion
            </v-btn>

            <v-spacer />

            <v-btn color="primary" rounded elevation="2" @click="$router.push('/')">
              <v-icon left>
                mdi-home
              </v-icon>
              Accueil
            </v-btn>
          </v-card-actions>

      </v-card>
    </v-container>
  </v-img>
</template>

<script>
export default {
  name: "Deconnexion",
  layout: 'empty',
  created() {
    this.$store.commit('profil/reset')
    this.$store.commit('search/reset')
    this.$store.commit('tabAnnonce/reset')
    this.$store.commit('session/deconnexion')
  }
}
</script>

<style scoped>

</style>
