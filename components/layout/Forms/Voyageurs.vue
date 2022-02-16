<template>
  <v-container style="background-color: white">
    <v-row>
      <v-col cols="12">
        <v-card elevation="0">
          <v-card-text>
            <v-row>
              <v-list>
                <v-list-item
                  v-for="(categorie, i) in categories"
                  :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-text="categorie.titre" />
                    <v-list-item-subtitle v-text="categorie.sousTitre" />
                  </v-list-item-content>
                  <v-list-item-action>
                    <PlusOuMoins :default=values[categorie.titre] @changeData="(v) => localValues[categorie.titre] = v"/>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-row>
            <v-row>
              <v-spacer />
              <v-btn color="info" rounded @click="submit">
                Ok
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlusOuMoins from "~/components/layout/Forms/PlusOuMoins";

export default {
  name: "Voyageurs",
  components: {
    PlusOuMoins
  },
  data() {
    return {
      values: {},
      localValues: {},
      categories:[
        {
          titre: 'Adultes',
          sousTitre: '13 ans et plus'
        },
        {
          titre: 'Enfants',
          sousTitre: 'De 2 à 12 ans'
        },
        {
          titre: 'Bébés',
          sousTitre: '- de 2 ans'
        },
      ]
    }
  },
  created() {
    const store = this.$store.getters["search/getValues"].Object
    this.values = store ? { ...store } : Object.assign({}, ...this.categories.map(c => { return { [c.titre]: 0 } }))
  },
  methods: {
    submit() {
      Object.keys(this.values).forEach(k => {
        if (!(k in this.localValues)) {
          this.localValues[k] = this.values[k];
        }
      })
      this.$emit('submit-object', this.localValues)
    },
  }
}
</script>

<style scoped lang="scss">
.v-list-item::v-deep {
  border-bottom: 1px solid lightgrey
}
</style>
