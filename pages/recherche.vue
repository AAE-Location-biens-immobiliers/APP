<template>
  <v-row class="mb-0 pa-0" no-gutters style="background-color:#1565C0">
    <v-col cols="4">
      <ItemListPins :items="annonces" />
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
import { Annonce } from "@/models/annonce";
import { Habitation } from "@/models/habitation";

export default {
  components: { ItemListPins, Map, filtreList },
  async asyncData(ctx) {
    const values = ctx.store.getters["search/getValues"]

    const params = {}

    let nb = null;
    Object.keys(values).forEach(k => {
      switch (k) {
        case 'String': params.ville = values[k]
          break;
        case 'Date-debut': params.debut = values[k].split('-').reverse().join('-')
          break;
        case 'Date-fin': params.fin = values[k].split('-').reverse().join('-')
          break;
        case 'Object':
          nb = Object.entries(values.Object).reduce((total, value) => total + value[1], 0)
          if(nb > 0) params.nbPersonne = nb
          break;
      }
    })

    const res = await ctx.$axios.get('/annonces/search', { params })

    if(res.status !== 200) ctx.error({ statusCode: 404, message: 'Page non trouvée' })
    else return { annonces: res.data.map(a => {
        a.idHabitation = new Habitation(a.idHabitation);
        a = new Annonce(a);
        return a
      }) }// commit("set", );
  }
}
</script>

<style scoped>
</style>
