<template>
  <v-card elevation="0">
    <v-form class="mx-2 mb-2">
      <v-col class="col-12">
        <v-row>
          <v-text-field
            v-model="data"
            label="Destination"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-spacer />
          <v-btn color="info" rounded @click="submit">
            Ok
          </v-btn>
        </v-row>
      </v-col>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "Destination",
  data() {
    return {
      data: ''
    }
  },
  methods: {
    submit() {
      if (this.data !== '') {
        this.$emit('submit-destination', this.data)
      }
    }
  }
}
</script>
