<template>
  <v-card
    class="mx-auto pa-3 overflow-y-auto"
    height="625px"
    width="100%"
    color="#1565C0"
  >
    <v-list style="overflow-y: auto" color="#1565C0" three-line>
      <template v-for="(item, index) in items">
        <div :key="index"><ItemPin :item="item" :index="index" /></div>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import ItemPin from '~/components/layout/ItemPin.vue'

export default {
  name: 'ItemListPins',
  components: { ItemPin },
  props: {
    items: {
      type: Object,
      default() {
        return {
          avatar: 'NaN',
          title: 'NaN',
          subtitle: 'NaN',
        }
      },
    },
  },
}
</script>

<style scoped>
</style>