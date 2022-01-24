<template>
  <v-card elevation="0" @click="open()">
    <v-row class="pa-0">
      <v-col :class="'py-0 pr-0 col-'.concat((criteria.search) ? '9' : '12')">
        <v-card-title class="pt-0 pr-0">{{ criteria.title }}</v-card-title>
        <v-card-subtitle class="pb-0 pr-0">{{ criteria.subtitle }}</v-card-subtitle>
      </v-col>

      <v-col :class="'my-auto pa-0 col-'.concat((criteria.search) ? '3' : '0')">
        <v-btn
          v-if="criteria.search"
          small
          color="error"
          fab
          elevation="3"
          @click.stop="button"
        >
          <v-icon color="white">
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Criteria",
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
  methods: {
    open() {
      alert('bite')
    },
    button() {
      alert('Buton')
    }
  }
}
</script>
