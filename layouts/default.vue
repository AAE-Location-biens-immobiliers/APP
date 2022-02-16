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
        <v-img
          v-bind="props"
          class="ml-10"
          :src="require('./../static/sharaloc.svg')"
          max-height="128"
          max-width="128"
          contain
        />
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

    <v-main>
      <v-sheet id="main" ref="main" @scroll="check">
        <v-container fluid pa-0>
          <NotificationListe />
          <overlay v-model="overlay"/>
          <Nuxt />
        </v-container>
      </v-sheet>
    </v-main>

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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

#main {
  overflow: auto;
  max-height: 90vh;

  &::-webkit-scrollbar {
    display: none;
  }

  &>v-container {
    max-height: 100%;
  }
}

html {
  overflow: hidden;
}

.v-app-bar {
  z-index: 1000;
}

* {
  font-family: 'Roboto', sans-serif;
}



</style>
