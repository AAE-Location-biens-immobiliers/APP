<template>
  <v-card width="100%">
    <v-card-title>{{ annonce && annonce.description ? annonce.description : "" }}</v-card-title>
    <v-card-subtitle>Annonce reliée à l'habitation {{ annonce && annonce.idHabitation && annonce.idHabitation.description ? annonce.idHabitation.description : "" }}</v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col cols="auto">
          Prix :
        </v-col>
        <v-col cols="fill" class="pl-0">
          <strong>{{ annonce.prix }}</strong> €/nuit
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          Type d'annonce :
        </v-col>
        <v-col cols="fill" class="pl-0">
          {{ annonce.type }}
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-list>
      <v-subheader>Disponibilités</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(dispo, i) in annonce.disponibilites"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title>Du {{ convert(dispo.debut) }} au {{ convert(dispo.fin) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider />

    <v-card-actions>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab small rounded color="error"
            v-bind="attrs" v-on="on"
            @click.stop="supprimer"
          >
            <v-icon small>
              mdi-close
            </v-icon>
          </v-btn>
        </template>
        <span>Supprimer</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AnnoncesCard",
  props: {
    annonce: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async supprimer() {
      try {
        await this.$store.dispatch('profil/deleteAnnonce', this.annonce.idAnnonce)
      } catch (e) {
        this.$nuxt.$emit('notification', true, e.message)
      }
    },
    convert(data) {
      if(data.includes('T')) data = data.split("T")[0]
      return data.split('-').reverse().join('/')
    }
  }
};
</script>

<style scoped>

</style>
