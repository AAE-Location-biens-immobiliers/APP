<template>
  <v-card class="search-bar">
    <v-container fluid class="fill-height px-1">
      <v-row class="mx-0">
        <v-col v-for="(criteria, i) in criterias" :key="i" class="col-3 pa-0" style="position: relative">
          <Criteria :criteria="criteria"/>
          <div :style="'position: absolute; top: 0; bottom: 0; right: 0;'.concat(i === criterias.length - 1 ? '' : 'border-right: 1px solid lightgrey;')" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Criteria from "@/components/layout/Criteria";

export default {
  name: "SearchBar",
  components: {
    Criteria
  },
  data() {
    return {
      criterias: [
        {
          title: 'Destination',
          subtitle: 'Où allez-vous ?',
          search: false,
          type: 'String'
        },
        {
          title: 'Arrivée',
          subtitle: 'Quand ?',
          search: false,
          type: 'Date-fin'
        },
        {
          title: 'Départ',
          subtitle: 'Quand ?',
          search: false,
          type: 'Date-depart'
        },
        {
          title: 'Voyageurs',
          subtitle: 'Qui ?',
          search: true,
          type: 'Object'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 9999px;

  &.search-bar {
    border: 1px solid black;
    height: 64px;
    width: 50vw;
  }
}
</style>
