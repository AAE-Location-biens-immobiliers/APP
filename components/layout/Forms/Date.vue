<template>
  <v-card elevation="0">
    <v-form class="mb-2">
      <v-col class="col-12">
        <v-row>
          <v-date-picker
            v-model="picker"
            :min="new Date().toJSON().slice(0,10).replace(/-/g,'-')" />
        </v-row>
        <v-row>
          <v-spacer />
          <v-btn color="info" rounded class="mx-2" @click="submit">
            Ok
          </v-btn>
        </v-row>
      </v-col>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "Date",
  data() {
    return {
      picker: ''
    }
  },
  methods: {
    submit() {
      if(this.picker !== '') {
        this.$emit('submit-date', this.picker.split('-').reverse().join('-'))
      }
    }
  }
}
</script>
