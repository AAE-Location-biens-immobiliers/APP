<template>
  <v-row class="mb-0 pa-0" no-gutters>
    <v-col fluid cols="14" sm="4">
      <ItemListPins :items="items" />
    </v-col>
    <v-col cols="14" sm="6">
      <Map />
    </v-col>
    <v-col cols="14" sm="2">
       <filtreList />
    </v-col>
  </v-row>
</template>

<script>
import ItemListPins from '../components/layout/ItemListPins.vue'
import filtreList from '../components/layout/FiltreList.vue'
import Map from '../components/layout/Map.vue'

export default {
  components: { ItemListPins, Map, filtreList },
  data: () => ({
    items: [
      {
        avatar: require('../static/maison1.jpg'),
        title: 'Brunch this weekend?',
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      {
        avatar: require('../static/maison2.jpg'),
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      {
        avatar: require('../static/background.jpeg'),
        title: 'Oui oui',
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      {
        avatar: require('../static/background2.jpeg'),
        title: 'Birthday gift',
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      {
        avatar: require('../static/maison1.jpg'),
        title: 'Recipe to try',
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
      {
        avatar: require('../static/maison1.jpg'),
        title: 'Brunch this weekend?',
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      {
        avatar: require('../static/maison1.jpg'),
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      {
        avatar: require('../static/maison1.jpg'),
        title: 'Oui oui',
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      {
        avatar: require('../static/maison1.jpg'),
        title: 'Birthday gift',
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      {
        avatar: require('../static/maison1.jpg'),
        title: 'Recipe to try',
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
}
</script>

<style scoped>
</style>