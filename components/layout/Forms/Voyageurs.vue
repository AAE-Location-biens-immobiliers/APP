<template>
  <v-card>
    <v-card-text>
      <v-row class="mx-auto">
        <v-list>
          <v-list-item
            v-for="(categorie, i) in categories"
            :key="i">

            <v-list-item-content>
              <v-row>
                <v-col cols="8" class="pr-0">
                  <v-list-item-title v-text="categorie.titre" />
                  <v-list-item-subtitle v-text="categorie.sousTitre" />
                </v-col>
                <v-col class="pl-0">
                  <PlusOuMoins @changeData="(v) => value = v"/>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-row>
      <v-row>
        <v-spacer />
        <v-btn color="info" rounded class="mb-2 mx-2" @click="submit">
          Ok
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
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
      value: 0,
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
  methods: {
    submit() {
      this.$emit()
    }
  }
}
</script>

<style scoped lang="scss">
.v-list-item::v-deep {
  border-bottom: 1px solid lightgrey
}
</style>
