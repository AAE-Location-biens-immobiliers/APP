<template>
  <v-card
    class="mx-auto pa-3 overflow-y-auto"
    height="625px"
    width="100%"
    color="#1565C0"
  >
    <v-list style="overflow-y: auto" color="#1565C0" three-line>
      <div v-for="(item, index) in items" :key="index">
        <ItemPin :item="item" />
      </div>
    </v-list>
  </v-card>
</template>

<script>
import ItemPin from '@/components/Map/ItemPin.vue'

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
