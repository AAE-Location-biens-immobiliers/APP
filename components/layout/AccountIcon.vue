<template>
  <v-card
    outlined
    rounded-pill
    max-height="48"
    style="border-radius: 9999px; border: 1px solid black"
    class="pl-2"
    >

    <SignMenu :profil-image="null"/>

  </v-card>
</template>

<script>
import SignMenu from "@/components/layout/SignMenu";

export default {
  name: "AccountIcon",
  components: {
    SignMenu
  },
  data:() => {
    return {
      profileImage: null
    }
  }
}
</script>

<style scoped>

</style>
