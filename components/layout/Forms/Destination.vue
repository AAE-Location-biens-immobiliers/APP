<template>
  <v-card elevation="0">

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="data"
            label="Destination"
            hide-details
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="info" rounded  @click="submit">
        Ok
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: "Destination",
  data() {
    return {
      data: '',
      items: [],
      search: ''
    }
  },
  watch: {
    search() {
      this.fetchData()
    }
  },
  methods: {
    submit() {
      if (this.data !== '') {
        this.$emit('submit-destination', this.data)
      }
    },
    async fetchData() {
      try {
        const res = await this.$axios.get('/google/autocomplete', {
          params: {
            'input': this.search,
            'key': process.env.GOOGLE_API_KEY,
            'language': 'fr'
          }
        })
        if (res.status === 200) this.items = res.data
      } catch (e) {
        this.items = []
      } finally {
        this.$forceUpdate()
      }
    }
  }
}
</script>
