<template>
  <v-card class="search-bar">
    <v-tooltip bottom>
      <template #activator="{ attrs, on }">
        <v-btn
          small fab rounded color="error"
          style="transform: translateX(-150%); top: 25%; bottom: 25%; position: absolute"
          class="my-auto"
          v-bind="attrs" v-on="on"
          @click="reset"
        >
          <v-icon class="delete">
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <span>Effacer la recherche</span>
    </v-tooltip>
    <v-container fluid class="fill-height px-1" >
      <v-row class="mx-0">
        <v-col v-for="(criteria, i) in criterias" :key="i" class="col-3 pa-0" style="position: relative">
          <Criteria :criteria="criteria" @search="search" />
          <div :style="'position: absolute; top: 0; bottom: 0; right: 0;'.concat(i === criterias.length - 1 ? '' : 'border-right: 1px solid lightgrey;')" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Criteria from "@/components/layout/Criteria";

export default {
  name: "SearchBar",
  components: {
    Criteria
  },
  data() {
    return {
      criterias: [
        {
          title: 'Destination',
          subtitle: 'Où allez-vous ?',
          search: false,
          type: 'String'
        },
        {
          title: 'Arrivée',
          subtitle: 'Quand ?',
          search: false,
          type: 'Date-debut'
        },
        {
          title: 'Départ',
          subtitle: 'Quand ?',
          search: false,
          type: 'Date-fin'
        },
        {
          title: 'Voyageurs',
          subtitle: 'Qui ?',
          search: true,
          type: 'Object'
        },
      ],
    }
  },
  methods: {
    async search() {
      const values = this.$store.getters["search/getValues"]

      if (!('String' in values) || 'String' in values && values.String === '') {
        this.$nuxt.$emit('notification', null, "S'il vous plaît choisissez une destination")
        return
      }

      if(!this.checkDate(values)) return

      await this.$router.push('/recherche')
      await this.$nuxt.refresh()
    },
    checkDate(values) {
      const dateKeys = Object.keys(values).filter(el => el.includes('Date') && values[el] !== null).length

      if(dateKeys !== 2 && dateKeys !== 0) {
        this.$nuxt.$emit('notification', null, "Choisissez une date de départ et une date de fin")
        return false
      }

      if(dateKeys === 0) return true

      const dateArrivee = new Date(values['Date-debut'].split('-').reverse().join('-'))
      const dateDepart = new Date(values['Date-fin'].split('-').reverse().join('-'))

      if (dateArrivee === dateDepart) {
        this.$nuxt.$emit('notification', null, 'Saisissez une date d\'arrivée différente de la date de départ !')
        return false
      }

      if (dateArrivee > dateDepart) {
        const intermediate = values['Date-fin']
        this.$store.commit('search/set', {'Date-fin' : values['Date-debut'] })
        this.$store.commit('search/set', {'Date-debut' : intermediate })
      }

      return true
    },
    reset() {
      this.$store.commit('search/reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 9999px;

  &.search-bar {
    border: 1px solid black;
    height: 64px;
    width: 50vw;
  }
}

.delete:hover {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
}
</style>
