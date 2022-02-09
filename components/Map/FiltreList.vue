<template>
  <v-card
    class="mx-auto pa-3 overflow-y-auto"
    height="625px"
    width="100%"
    color="#E0E0E0"
  >
    <v-list style="overflow-y: auto" color="#E0E0E0" one-line>
      <div v-for="(filtre, index) in filtres" :key="index">
        <filtre :filtre="filtre" />
      </div>
    </v-list>
  </v-card>
</template>

<script>
import filtre from '@/components/Map/Filtre.vue'

export default {
  name: 'FilstreList',
  components: { filtre },
  data: () => ({
    filtres: [
      {
        filtres: 'Filtres',
        icon:'fas fa-list'
      },
      {
        divider: true,
        inset: true,
      },
      {
        type: 'Annulation gratuite',
      },
      {
        type: 'Wifi',
      },
      {
        type: 'Lave linge',
      },
      {
        type: 'Cuisine',
      },
      {
        type: 'Sèche linge',
      },
      {
        type: 'Wifi',
      },
      {
        type: 'Wifi',
      },
      {
        type: 'Wifi',
      },
      {
        type: 'Wifi',
      },
    ],
  }),
}
</script>

<style scoped>
</style>
