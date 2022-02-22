<template>
  <v-container
    class="item mx-auto"
    style="margin-bottom: 10px; background: white"
    @click="clickAnnonce"
  >
    <v-list-item>
      <v-list-item-content style="margin-right:10px">
        <v-img :src="item.idHabitation.photo" style="border-radius: 35px" max-height="100%" max-width="100%" />
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.description }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <span>
            {{ item.type }}
          </span>
        </v-list-item-subtitle>
        <v-container class="px-0">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-row>
                <v-col cols="auto">
                  <span><strong>Prix</strong></span>
                </v-col>
                <v-col cols="fill" class="pl-0">
                  {{ item.prix }} € / nuit
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-content>
    </v-list-item>
  </v-container>
</template>

<script>
export default {
  name: 'ItemPin',
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
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    clickAnnonce() {
      this.$store.commit('tabAnnonce/set', this.item)
      this.$router.push('/annonce')
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  border-radius: 50px;
  border: 2px solid rgb(78, 76, 76);

  &:hover {
    cursor: pointer;
  }
}
</style>
