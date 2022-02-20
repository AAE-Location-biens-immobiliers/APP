<template>
  <div style="margin: 15px">
    <v-card
      height="600px"
      width="100%"
      outlined
      color="secondary"
      class="mx-auto"
    >
      <v-list color="transparent" one-line>
        <ParameterFiltre @submit-data="updateFiltres"/>
      </v-list>

      <v-divider
        style=" margin-top: 20px; margin-left: 10px;margin-right: 10px;"
        color="#757575"
      />
      <v-card
        class=" overflow-y-auto"
        height="510px"
        width="100%"
        outlined
        color="transparent"
      >
        <v-list color="transparent" one-line>
          <div v-for="(filtre, index) in filtres" :key="index">
            <div v-if="filtre.choose" @click="clickEvent(filtre)">
              <filtre :filtre="filtre"/>
            </div>
          </div>
        </v-list>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import ParameterFiltre from "@/components/map/ParameterFiltre";
import filtre from '@/components/map/Filtre.vue'

export default {
  name: 'FiltreList',
  components: { ParameterFiltre, filtre },
  data() {
    return {
      values: {
        type: 'Type de logement',
        name: 'Maison',
        choose: false,
      },
      filtres: {},
    }
  },

  methods: {
    updateFiltres(data) {
      /* alert('Event accessed from parent!'); */
      this.filtres = data;
      this.$store.commit('tabAnnonce/filter', {
        type: this.filtres.filter(f => f.type === 'Type de logement' && f.choose === true),
        commodites: this.filtres.filter(f => f.commodities === 'Commodites'  && f.choose === true)
      })
    },
    clickEvent(filtre) {
      filtre.choose = false;
      if(filtre.number) {
        filtre.number = 0;
      }
    },

  }
}
</script>

<style scoped>
</style>
