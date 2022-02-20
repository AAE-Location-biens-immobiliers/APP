<template>
  <v-container>
    <v-list-item-title
      class="item "
      style="cursor: pointer; padding: 15px; margin-bottom: 10px; background: white"
    >
      <v-row class="d-flex justify-center">
        {{ filtre.name }}
        <div v-if="filtre.number">({{ filtre.number }})</div>
      </v-row>
    </v-list-item-title>
  </v-container>
</template>

<script>
export default {
  name: 'Filtre',
  props: {
    filtre: {
      type: Object,
      default() {
        return {
          type: 'NaN',
        }
      },
    },
  },

}
</script>

<style scoped>
.item {
  border-radius: 50px;
  border: 2px solid rgb(78, 76, 76);
}
</style>
