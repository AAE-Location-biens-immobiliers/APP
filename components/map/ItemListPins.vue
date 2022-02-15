<template>
  <v-card
    class="o pa-3 overflow-y-auto"
    style="margin: 15px"
    height="600px"
    color="secondary"
  >
    <v-list style="overflow-y: auto" color="secondary" three-line>
      <div v-for="(item, index) in items" :key="index">
        <ItemPin :item="item" />
      </div>
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

<style scoped>
</style>
