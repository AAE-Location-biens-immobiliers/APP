<template>
  <v-container>
    <div
      v-if="filtre.filtres"
      class="item d-flex justify-center"
      style="padding: 15px; margin-top: 10px; background: white"
    >
      <v-list-item-title v-html="filtre.filtres" />
      <v-icon>mdi-gesture-tap-button</v-icon>
    </div>
    <v-list-item-title
      v-else-if="filtre.type"
      class="item d-flex justify-center"
      style="padding: 15px; margin-top: 10px; background: white"
    >
      {{ filtre.type }}
    </v-list-item-title>
    <v-divider
      v-else-if="filtre.divider"
      color="#757575"
    />
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
