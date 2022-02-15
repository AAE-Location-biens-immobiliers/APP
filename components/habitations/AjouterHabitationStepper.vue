<template>
  <v-dialog :value="show" @click:outside="$emit('change', false)">
    <v-stepper v-model="step">

      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          step="1"
        >
          Modalités
          <v-icon small>
            mdi-file-document-multiple-outline
          </v-icon>
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="step > 2"
          step="2"
        >
          Equipements
          <v-icon small>
            mdi-table-furniture
          </v-icon>
        </v-stepper-step>

        <v-divider />

        <v-stepper-step step="3">
          Visuel
          <v-icon small>
            mdi-panorama-variant
          </v-icon>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>

        <v-stepper-content step="1">
          <v-card>

            <v-card-title>
              Modalités
              <v-icon small>
                mdi-file-document-multiple-outline
              </v-icon>
            </v-card-title>

            <v-card-actions>
              <v-btn text rounded color="error">
                Fermer
              </v-btn>
              <v-spacer />
              <v-btn fab rounded color="info" small @click="step = 2">
                <v-icon small>
                  mdi-arrow-right-circle
                </v-icon>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>

            <v-card-title>
              Equipements
              <v-icon small>
                mdi-table-furniture
              </v-icon>
            </v-card-title>

            <v-card-actions>
              <v-btn fab rounded color="info" small @click="step = 1">
                <v-icon small>
                  mdi-arrow-left-circle
                </v-icon>
              </v-btn>
              <v-spacer />
              <v-btn fab rounded color="info" small @click="step = 3">
                <v-icon small>
                  mdi-arrow-right-circle
                </v-icon>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>

            <v-card-title>
              Visuel
              <v-icon small>
                mdi-panorama-variant
              </v-icon>
            </v-card-title>

            <v-card-actions>
              <v-btn fab rounded color="info" small @click="step = 2">
                <v-icon small>
                  mdi-arrow-left-circle
                </v-icon>
              </v-btn>
              <v-spacer />
              <v-btn rounded color="success" outlined @click="envoyer">
                <v-icon small left>
                  mdi-plus
                </v-icon>
                Ajouter l'habitation
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-stepper-content>

      </v-stepper-items>

    </v-stepper>
  </v-dialog>
</template>

<script>
export default {
  name: "AjouterHabitationStepper",
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 1
    }
  },
  methods: {
    closeDialog() {
      this.$emit('change', false)
    },
    envoyer() {
      alert('bite');
      this.closeDialog()
    }
  }
};
</script>

<style scoped>

</style>
