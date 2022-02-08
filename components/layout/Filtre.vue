<template v-slot:default="{ active }">
  <v-container :key="index">
    <div
      class="item d-flex justify-center"
      style="padding: 15px; margin-top: 10px; background: white"
      v-if="filtre.filtres"
    >
        <v-list-item-title v-html="filtre.filtres"></v-list-item-title>
        <v-icon>mdi-gesture-tap-button</v-icon>
   
    </div>
    <v-list-item-title
      class="item d-flex justify-center"
      style="padding: 15px; margin-top: 10px; background: white"
      v-else-if="filtre.type"
      v-html="filtre.type"
    ></v-list-item-title>
    <v-divider
      v-else-if="filtre.divider"
      :key="index"
      color="#757575"
    ></v-divider>
  </v-container>
</template>

<script>
export default {
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
  border: 3px solid rgb(78, 76, 76);
}
</style>
