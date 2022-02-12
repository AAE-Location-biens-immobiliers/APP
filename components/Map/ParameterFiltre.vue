<template>
  <v-dialog
    v-model="dialog"
    width="600px"
  >
    <template #activator="{ }">
      <v-btn
        class="item d-flex justify-center"
        style="width:90%; padding: 15px; margin-top: 10px; margin-left: 10px; background: white"
        @click="dialog = true"
      >
        Filtre
        <v-icon>mdi-gesture-tap-button</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Paramètre des filtres</span>
      </v-card-title>
      <v-card class="o pa-3 overflow-y-auto "
              style="margin: 15px"
              color="transparent"
              outlined>
        <v-card-title>
          <span class="text-h6">Chambres et lits</span>
        </v-card-title>
        <v-list color="transparent" one-line>
          <div
            v-for="(filtre, index) in this.filtres"
            :key="index"
            color="transparent"

          >
            <div v-if="filtre.piece" style="margin-bottom: 20px">
              <v-row class="mb-0 pa-0" no-gutters>
                <v-col fluid cols="12" sm="5">
                  {{ filtre.name }}
                </v-col>
                <v-col fluid cols="12" sm="7">
                  <v-row>
                    <v-btn
                      class="mx-5"
                      fab
                      small
                      :disabled="filtre.number===0"
                      @click="clickEventMinus(filtre)"
                    >
                      <v-icon white>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                    <div style="margin-top: 10px">
                      {{ filtre.number }}
                    </div>
                    <v-btn
                      class="mx-5"
                      fab
                      small
                      @click="clickEventPlus(filtre)"
                    >
                      <v-icon white>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-list>
      </v-card>
      <v-card class="o pa-3 overflow-y-auto"
              style="margin: 15px"
              color="secondary">
        <v-card-title>
          <span class="text-h6">Commodités</span>
        </v-card-title>
        <v-card
          class="d-flex flex-wrap"
          color="transparent"
          outlined
          flat
          tile
        >
          <div
            v-for="(filtre, index) in this.filtres"
            :key="index"
            color="transparent"

          >
            <div v-if="filtre.commodities">

              <div v-if="!filtre.choose" class=" item pa-2" style="cursor: pointer; background-color:white; margin: 5px"
                   @click="clickEvent(filtre)">
                {{ filtre.name }}
              </div>
            </div>
          </div>
        </v-card>
      </v-card>
      <v-card class="o pa-3 overflow-y-auto"
              style="margin: 15px"
              color="secondary">
        <v-card-title>
          <span class="text-h6">Type de logement</span>
        </v-card-title>
        <v-card
          class="d-flex flex-wrap"
          color="transparent"
          outlined
          flat
          tile
        >
          <div
            v-for="(filtre, index) in filtres"
            :key="index"
            color="transparent"

          >
            <div v-if="filtre.type">

              <div v-if="!filtre.choose" class=" item pa-2" style="cursor: pointer; background-color:white; margin: 5px"
                   @click="clickEvent(filtre)">
                {{ filtre.name }}
              </div>
            </div>
          </div>
        </v-card>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
          Sortir
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
          Appliquer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>

export default {
  props: {},
  data: () => ({
    dialog: false,
    filtres: [
      {
        type: 'Type de logement',
        name: 'Maison',
        choose: false,
      },
      {
        type: 'Type de logement',
        name: 'Appartement',
        choose: false,
      },
      {
        type: 'Type de logement',
        name: 'Chambre',
        choose: false,
      },
      {
        type: 'Type de logement',
        name: 'Chalet',
        choose: false,
      },
      {
        type: 'Type de logement',
        name: 'Annulation gratuite',
        choose: false,
      },
      {
        commodities: 'Commodites',
        name: 'Laveuse',
        choose: false,
      },
      {
        commodities: 'Commodites',
        name: 'Wifi',
        choose: false,
      },
      {
        commodities: 'Commodites',
        name: 'Secheuse',
        choose: false,
      },
      {
        commodities: 'Commodites',
        name: 'Climatisation',
        choose: false,
      },
      {
        commodities: 'Commodites',
        name: 'Cuisine',
        choose: false,
      },
      {
        commodities: 'Commodites',
        name: 'Piscine',
        choose: false,
      },
      {
        piece: 'Chambres et Lits',
        name: 'Chambres',
        choose: false,
        number: 0,
      },
      {
        piece: 'Chambres et Lits',
        name: 'Lits',
        choose: false,
        number: 0,
      },
      {
        piece: 'Chambres et Lits',
        name: 'Salles de bains',
        choose: false,
        number: 0,
      },
    ],

  }),
  methods: {
    clickEvent(filtre) {
      filtre.choose = true;
      this.submit();
    },
    submit() {
      this.$emit('submit-data', this.filtres)
    },
    clickEventPlus(filtre) {
      filtre.number += 1
      if (filtre.number === 1) {
        filtre.choose = true;
      }
      this.submit();
    },
    clickEventMinus(filtre) {
      filtre.number -= 1
      if (filtre.number === 0) {
        filtre.choose = false;
      }
    },


  }

}
</script>

<style scoped>
.item {
  border-radius: 10px;
  border: 2px solid rgb(78, 76, 76);
}
</style>
