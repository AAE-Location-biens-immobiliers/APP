<template>
  <v-card ref="card" elevation="0" @click.stop="open">
    <v-row class="pa-0">
      <v-col :class="'py-0 pr-0 col-'.concat((criteria.search) ? '9' : '12')">
        <v-card-title class="pt-0 pr-0">{{ criteria.title }}</v-card-title>
        <v-card-subtitle class="pb-0 pr-0">{{ data === null ? criteria.subtitle : data }}</v-card-subtitle>
      </v-col>

      <v-col :class="'my-auto pa-0 col-'.concat((criteria.search) ? '3' : '0')">
        <v-btn
          v-if="criteria.search"
          small
          color="error"
          fab
          elevation="3"
          @click.stop="$emit('search')"
        >
          <v-icon color="white">
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <CriteriaMenu
      v-model="showMenu"
      :x="x" :y="y"
      :data-type="criteria.type"
      @submit-data="submit"
    />
  </v-card>
</template>

<script>
import CriteriaMenu from "~/components/layout/CriteriaMenu";

export default {
  name: "Criteria",
  components: {
    CriteriaMenu
  },
  props: {
    criteria: {
      type: Object,
      default() {
        return {
          title: 'NaN',
          subtitle: 'NaN',
          search: false,
          type: 'NaN'
        }
      }
    }
  },
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      data: null,
    }
  },
  methods: {
    open() {
      this.showMenu = false
      this.x = this.$refs.card.$el.getBoundingClientRect().left
      this.y = this.$refs.card.$el.getBoundingClientRect().top + this.$refs.card.$el.clientHeight + 5
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    submit(payload) {
      this.data = typeof payload !== typeof {} ? payload : this.criteria.subtitle
      this.$emit('submit-data', payload)
    }

  }
}
</script>
