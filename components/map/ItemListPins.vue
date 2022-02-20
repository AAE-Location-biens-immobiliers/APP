<template>
  <v-card
    class="pa-3 overflow-y-auto"
    style="margin: 15px"
    height="600px"
    color="secondary"
  >
    <v-list style="overflow-y: auto" color="secondary" three-line>
      <v-list-item v-for="(item, index) in items" :key="index">
        <ItemPin :item="item" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import ItemPin from '@/components/map/ItemPin.vue'

export default {
  name: 'ItemListPins',
  components: { ItemPin },
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped lang="scss">
.v-card::-webkit-scrollbar {
  display: none;
}
</style>
