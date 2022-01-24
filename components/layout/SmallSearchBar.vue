<template>
  <v-card
    style="border-radius: 9999px; border: 1px solid black"
    width="250"
    height="40"
    @click="$emit('extend')"
  >

    <v-container fluid>
      <v-row class="align-center">

        <v-col class="col-10 pa-0 pt-2 pl-2" style="height: 40px" >
          <v-input disabled class="">
            Commencer
          </v-input>
        </v-col>

        <v-col class="col-2 pa-0 pl-1">
          <v-btn
            x-small
            color="error"
            fab
            elevation="3"
          >
            <v-icon color="white" small>
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </v-container>

  </v-card>
</template>

<script>
export default {
  name: "SmallSearchBar"
}
</script>

<style scoped>

</style>
