<template>
  <v-app app @overlay="(val) => overlay = val">

    <v-app-bar
      ref="appBar"
      color="secondary"
      fixed
      app
      shrink-on-scroll
      scroll-target="#main">

      <template #img="{ props }">
        <v-img
          v-bind="props"
          class="ml-10"
          :src="require('./../static/sharaloc.svg')"
          max-height="128"
          max-width="128"
          contain
        />
      </template>

      <v-card width="128" class="ml-10" />

      <v-spacer />

      <SearchBar v-show="isP" class="my-auto" />

      <SmallSearchBar
        v-show="!isP"
        class="my-auto"
        @extend="extend"
      />

      <v-spacer />

      <AccountIcon class="mr-10 my-auto"/>

    </v-app-bar>

    <v-sheet id="main" ref="main" max-height="100vh" style="overflow: auto" @scroll="check()">
      <v-main>
        <v-container fluid>
          <overlay :overlay="overlay"/>
          <Nuxt />
        </v-container>
      </v-main>
    </v-sheet>

    <v-footer
      fixed
      app>
      <span>{{ name }} &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
import Overlay from "@/components/global/Overlay";
import AccountIcon from "@/components/layout/AccountIcon";
import SearchBar from "@/components/layout/SearchBar";
import SmallSearchBar from "@/components/layout/SmallSearchBar";

export default {
  components: {
    SearchBar,
    SmallSearchBar,
    AccountIcon,
    Overlay
  },
  data () {
    return {
      name: "Sharaloc",
      overlay: false,
      isP: true
    }
  },
  methods: {
    check() {
      this.isP = this.$refs.appBar.$el.clientHeight > 75
    },
    extend() {
      this.$refs.main.$el.scrollTo(0,0);
      setTimeout(() => { this.isP = true }, 50)
    }
  }
}
</script>

<style>
html {
  overflow: hidden;
}

#main::-webkit-scrollbar {
  display: none;
}
</style>
