<template>
  <v-container fluid>
    <v-tabs v-model="tab">
      <v-tab :key="0">
        Mes habitations
        <v-icon class="ml-2">
          mdi-home
        </v-icon>
      </v-tab>
      <v-tab :key="1">
        Mes annonces
        <v-icon class="ml-2">
          mdi-message-alert
        </v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :key="0">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn class="float-right" v-bind="attrs" rounded color="warning" v-on="on" @click="showAjouterHabitation = true">
              <v-icon left>
                mdi-view-grid-plus
              </v-icon>
              Ajouter
            </v-btn>
          </template>
          <span>Ajouter une habitation</span>
        </v-tooltip>
        <v-container class="my-3">
          <v-row>
            <v-col cols="12">
              <v-row v-for="(habitation, i) in $store.getters['profil/getHabitations']" :key="i">
                <HabitationCard :habitation="habitation" class="my-4"/>
              </v-row>
            </v-col>
          </v-row>
          <AjouterHabitationStepper :key="stepperIndex" v-model="showAjouterHabitation"/>
        </v-container>
      </v-tab-item>

      <v-tab-item :key="1">
        <v-container class="my-3">
          Annonces
        </v-container>
      </v-tab-item>
    </v-tabs-items>

  </v-container>
</template>

<script>
import HabitationCard from "@/components/habitations/HabitationCard";
import AjouterHabitationStepper from "@/components/habitations/AjouterHabitationStepper";

export default {
  name: "Annonces",
  components: { AjouterHabitationStepper, HabitationCard },
  middleware: 'auth',
  data() {
    return {
      habitations: [],
      tab: null,
      showAjouterHabitation: false,
      stepperIndex: 0
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('profil/fetchHabitations')
    } catch (e) {
      this.$nuxt.$emit('notification', true, e.message)
    }
  },
  watch: {
    '$store.state.profil.habitations'() {
      this.$forceUpdate()
    },
    showAjouterHabitation(nV) {
      if(nV === true) this.stepperIndex += 1
    }
  }
};
</script>

<style scoped>

</style>
