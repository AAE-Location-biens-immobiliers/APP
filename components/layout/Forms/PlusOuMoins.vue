<template>
  <v-row class="my-auto">
    <v-col class="px-0 col-4">
      <v-btn fab x-small @click.stop="decrease">
        <v-icon>
          mdi-minus
        </v-icon>
      </v-btn>
    </v-col>
    <v-col class="px-0 col-4">
      <v-input>{{ value }}</v-input>
    </v-col>
    <v-col class="px-0 col-4">
      <v-btn fab x-small @click.stop="increase">
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PlusOuMoins",
  data() {
    return {
      value: 0
    }
  },
  methods: {
    increase() {
      this.value += 1
      this.$emit('changeData', this.value)
    },
    decrease() {
      this.value -= 1
      this.$emit('changeData', this.value)
    }
  }
}
</script>

<style scoped>

</style>
