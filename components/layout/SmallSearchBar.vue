<template>
  <v-container
    fill-height
    class="smallSearchBar"
    @click="$emit('extend')">

    <v-row no-gutters class="align-center">
      <v-col cols="10">
        <v-input dense hide-details>
          Commencer
        </v-input>
      </v-col>

      <v-col cols="2">
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
</template>

<script>
export default {
  name: "SmallSearchBar"
}
</script>

<style scoped lang="scss">
.smallSearchBar {
  border-radius: 9999px;
  border: 1px solid black;
  width: 250px;
  height: 42px;
  background-color: white;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;

  &:hover {
    cursor: pointer;
  }
}
</style>
