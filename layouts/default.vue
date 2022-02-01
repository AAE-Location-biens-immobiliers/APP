<template>
  <v-app app>

    <v-app-bar
      ref="appBar"
      color="secondary"
      fixed
      app
      shrink-on-scroll
      scroll-target="#main">

      <template #img="{ props }">
        <div @click="$router.push('/')">
          <v-img
            v-bind="props"
            class="ml-10"
            :src="require('./../static/sharaloc.svg')"
            max-height="128"
            max-width="128"
            contain
          />
        </div>
      </template>

      <v-card width="128" max-height="128" class="ml-5"  />

      <v-spacer />

      <SearchBar v-show="isP" class="ma-auto" />

      <SmallSearchBar
        v-show="!isP"
        class="my-auto"
        @extend="extend"
      />

      <v-spacer />

      <AccountIcon class="mr-10 my-auto"/>

    </v-app-bar>

    <v-sheet id="main" ref="main" @scroll="check">
      <v-main>
        <v-container fluid>
          <NotificationListe />
          <overlay v-model="overlay"/>
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
import NotificationListe from "@/components/global/NotificationListe";

export default {
  components: {
    NotificationListe,
    SearchBar,
    SmallSearchBar,
    AccountIcon,
    Overlay,
  },
  data () {
    return {
      name: "Sharaloc",
      overlay: false,
      isP: true
    }
  },
  created() {
    this.$nuxt.$on('overlay', (val) => {
      this.overlay = val
    })
  },
  methods: {
    check() {
      this.isP = this.$refs.appBar.$el.clientHeight > 75
    },
    extend() {
      this.$refs.main.$el.scrollTo(0,0);
      setTimeout(() => { this.isP = true }, 25)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

#main::-webkit-scrollbar {
  display: none;
}

#main {
  overflow: auto;
  max-height: 100vh;
}

.v-app-bar {
  z-index: 1000;
}

* {
  font-family: 'Roboto', sans-serif;
}

html {
  overflow: hidden;
}
</style>
