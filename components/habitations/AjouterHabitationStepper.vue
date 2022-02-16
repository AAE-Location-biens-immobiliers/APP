<template>
  <v-dialog :value="show" max-width="70%" @click:outside="$emit('change', false)">
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
          <v-card @keyup.enter="toStep2">

            <v-card-title>
              Modalités
              <v-icon class="ml-2">
                mdi-file-document-multiple-outline
              </v-icon>
            </v-card-title>

            <v-card-text>
              <v-form ref="modalites">
                <v-row>
                  <v-col cols="auto" class="align-self-end">
                    <v-input readonly>
                      Description
                    </v-input>
                  </v-col>
                  <v-col cols="fill">
                    <v-text-field
                      v-model="habitation.description"
                      label="Appartement T2"
                      :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="auto" class="align-self-end">
                    <v-input readonly>
                      Numéro
                    </v-input>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="habitation.numero"
                      dense
                      type="number"
                      label="518"
                      :min="1"
                    />
                  </v-col>

                  <v-col cols="auto" class="align-self-end">
                    <v-input readonly>
                      Rue
                    </v-input>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="habitation.rue"
                      dense
                      label="rue Morin"
                      :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="auto" class="align-self-end">
                    <v-input readonly>
                      Code postal
                    </v-input>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="habitation.code"
                      dense
                      label="12345"
                      :rules="[rules.required]"
                    />
                  </v-col>

                  <v-col cols="auto" class="align-self-end">
                    <v-input readonly>
                      Ville
                    </v-input>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="habitation.ville"
                      dense
                      label="Chicoutimi"
                      :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="auto" class="align-self-end">
                    <v-input readonly>
                      Pays
                    </v-input>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="habitation.pays"
                      dense
                      label="Canada"
                      :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>

              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn text rounded color="error">
                Fermer
              </v-btn>
              <v-spacer />
              <v-btn fab rounded color="info" small @click="toStep2">
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
              <v-icon class="ml-2">
                mdi-table-furniture
              </v-icon>
            </v-card-title>

            <v-card-text>

              <v-row>
                <v-col cols="3">
                  <v-checkbox v-model="habitation.wifi">
                    <template #label>
                      <span>Wi-fi</span>
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox v-model="habitation.lave_linge">
                    <template #label>
                      <span>Lave linge</span>
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox v-model="habitation.seche_linge">
                    <template #label>
                      <span>Sèche-linge</span>
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox v-model="habitation.climatisation">
                    <template #label>
                      <span>Climatisation</span>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3">
                  <v-checkbox v-model="habitation.cuisine">
                    <template #label>
                      <span>Cuisine</span>
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox v-model="habitation.parking">
                    <template #label>
                      <span>Parking</span>
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox v-model="habitation.tv">
                    <template #label>
                      <span>TV</span>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>

            </v-card-text>

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
              <v-icon class="ml-2">
                mdi-panorama-variant
              </v-icon>
            </v-card-title>

            <v-card-text>
              <v-file-input
                ref='fileInput'
                show-size
                class='mt-1'
                chips
                label="L'image de l'habitation"
                outlined
                accept="image/png, image/jpeg"
                :rules="[
                  v => !v || v.size < 2000000 || 'La taille de l\'image ne doit pas dépasser 2MB !',
                  v => !v || Boolean(v.type.match('image.*')) || 'Le document doit être une image !'
                ]"
                counter
                @change='convert'
                @click:clear="habitation.photo = null"
              />
              <strong>
                Prévisualisation
              </strong>

              <v-container>
                <v-sheet
                  v-show='!habitation.photo'
                  color='grey'
                  :rounded="true"
                  class="mx-auto visualizer"
                  height='250'
                  width='250'
                  @click='$refs.fileInput.$refs.input.click()'
                />
                <v-img
                  v-show="habitation.photo"
                  contain
                  max-height='250'
                  class='mx-auto'
                  alt='Image à upload'
                  :src='habitation.photo'
                />
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn fab rounded color="info" small @click="step = 2">
                <v-icon small>
                  mdi-arrow-left-circle
                </v-icon>
              </v-btn>
              <v-spacer />
              <v-btn rounded color="success" outlined :loading="loading" @click="envoyer">
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
import { Habitation } from "@/models/habitation";

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
      step: 1,
      habitation: new Habitation({}),
      rules: {
        required: v => !!v || 'Ce champ est requis'
      },
      loading: false
    }
  },
  watch: {
    'habitation.numero'(nV) {
      if (nV && nV < 1) this.habitation.numero = 1
    }
  },
  methods: {
    closeDialog() {
      if (!this.loading) this.$emit('change', false)
    },
    async envoyer() {
      this.loading = true
      try {
        await this.$store.dispatch('profil/postHabitation', this.habitation)
      } catch (e) {
        this.$nuxt.$emit('notification', true, e.message)
      } finally {
        this.loading = false
        this.closeDialog()
      }

    },
    toStep2() {
      this.step = this.$refs.modalites.validate() ? 2 : 1
    },
    convert(data) {
      if (data && typeof data === typeof Object() && data.size < 2000000) {
        const reader = new FileReader()
        if (data.type.match('image.*')) {
          reader.readAsDataURL(data);
        }
        const self = this
        reader.onloadend = () => {
          self.habitation.photo = reader.result
        }
      }
    }
  }
};
</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.visualizer:hover {
  cursor: pointer;
}
</style>
