<template>
  <v-container
    class="item mx-auto"
    style="margin-bottom: 10px; background: white"
  >
    <v-list-item :key="item.title">
      <v-list-item-content style="margin-right:10px">
        <v-img :src="item.avatar" style="border-radius: 35px" max-height="100%" max-width="100%"></v-img>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title v-html="item.title"></v-list-item-title>
        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        <v-row class="mb-0 pa-0" no-gutters>
          <v-col fluid cols="14" sm="10">
            <div >
              <v-rating
                v-model="rating"
                hover
                readonly
                background-color="indigo lighten-3"
                color="indigo"
                value="1"
                length="5"
                small
              />
              <div>
                Avis
              </div>
            </div>
          </v-col>
          <v-col cols="14" sm="2" class="d-flex align-content-end flex-wrap" >
            <div >
              Prix
            </div>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
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
  data: () => ({
    rating: 3.5,
  }),
}
</script>

<style scoped>
.item {
  border-radius: 50px;
  border: 2px solid rgb(78, 76, 76);
}
</style>
