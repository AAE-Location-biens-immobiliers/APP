<template>
  <v-dialog :value="show" max-width="60%" @click:outside="$emit('change', false)">
    <HabitationCard :habitation="habitation" :edit="true" @close="$emit('change', false)" />
  </v-dialog>
</template>

<script>
export default {
  name: "HabitationModal",
  components: { HabitationCard : () => import('./HabitationCard') },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    habitation: {
      type: Object,
      default() {
        return {}
      }
    }
  }
};
</script>

<style scoped>

</style>
