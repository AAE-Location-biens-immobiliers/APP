<template>
  <v-row class="align-content-center">
    <v-col cols="4" class="px-0">
      <v-btn fab x-small @click.stop="decrease">
        <v-icon>
          mdi-minus
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4" class="align-self-center">
      <v-input>{{ value }}</v-input>
    </v-col>
    <v-col cols="4" class="px-0">
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
  props: {
    default: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      value: 0
    }
  },
  created() {
    this.value = this.default
  },
  methods: {
    increase() {
      if(this.value < 9) {
        this.value += 1
        this.$emit('changeData', this.value)
      }
    },
    decrease() {
      if (this.value > 0) {
        this.value -= 1
        this.$emit('changeData', this.value)
      }
    }
  }
}
</script>
