<template>
  <v-dialog :value="show" max-width="35%" persistent>
    <v-card>
      <v-card-title class="primary white--text">Suppression</v-card-title>
      <v-card-subtitle class="primary white--text">
        Etes-vous sûr de vouloir supprimer l'habitation {{ habitation.description }} ?
      </v-card-subtitle>

      <v-card-text class="mt-4">
        Cette action est irréversible et cela entrainera la suppression de toutes les annonces liées à cette habitation.
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn text rounded color="info" @click="closeDialog">
          Non
        </v-btn>
        <v-spacer />
        <v-btn :loading="loading" text rounded color="error" @click="supprimer">
          Oui
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SuppressionModal",
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    habitation: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    closeDialog() {
      if(this.loading === false) this.$emit('change', false)
    },
    async supprimer() {
      this.loading = true
      try {
        await this.$store.dispatch('profil/deleteHabitation', this.habitation.idHabitation)
        this.$nuxt.$emit('notification', false, "L'habitation a bien été supprimée")
      } catch (e) {
        this.$nuxt.$emit('notification', true, e.message)
      } finally {
        this.loading = false
        this.closeDialog()
      }
    }
  }
};
</script>

<style scoped>

</style>
