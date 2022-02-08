<template v-slot:default="{ active }">
  <v-container
    :key="index"
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
        <div style="display: flex; justify-content: flex-start">
          <v-rating
            hover
            v-model="rating"
            readonly
            background-color="indigo lighten-3"
            color="indigo"
            value="1"
            length="5"
            small
          ></v-rating>
          <v-spacer />
          <div style="margin-top:8px">Prix</div>
        </div>
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
  border: 3px solid #BDBDBD;
}
</style>
