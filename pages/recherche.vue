<template>
  <v-row class="mb-0 pa-0" no-gutters style="background-color:#1565C0">
    <v-col cols="4">
      <ItemListPins :items="$store.getters['tabAnnonce/getTab']" />
    </v-col>
    <v-col cols="6">
      <Map />
    </v-col>
    <v-col cols="2">
       <filtreList />
    </v-col>
  </v-row>
</template>

<script>
import ItemListPins from '../components/map/ItemListPins.vue'
import filtreList from '../components/map/FiltreList.vue'
import Map from '../components/map/Map.vue'

export default {
  components: { ItemListPins, Map, filtreList },

}
</script>

<style scoped>
</style>
