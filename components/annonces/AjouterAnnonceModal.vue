<template>
  <v-dialog :value="show" max-width="400" @click:outside="closeDialog">
    <v-card>

      <v-card-title>Ajouter une annonce</v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="annonce.description"
                  label="Description de l'annonce"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="annonce.prix"
                  label="Prix"
                  type="number"
                  :min="0"
                  :rules="[rules.required, rules.numeric]"
                  dense
                />
              </v-col>
              <v-col cols="2" class="pl-0">
                €/nuit
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-combobox
                  v-model="annonce.type"
                  :items="types"
                  label="Type d'habitation"
                  outlined
                  hide-details
                  dense
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="fill">
                <v-text-field
                  v-model="annonce.nombrePlace"
                  label="Nombre de personnes"
                  type="number"
                  :min="0"
                  :rules="[rules.required, rules.numeric]"
                  dense
                />
              </v-col>
              <v-col cols="auto" class="pl-0">
                personnes
              </v-col>
            </v-row>

          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="error" @click.stop="closeDialog">
          Annuler
        </v-btn>
        <v-spacer />
        <v-btn text color="primary" @click.stop="ajouter">
          Ajouter
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import { Annonce } from "@/models/annonce";

export default {
  name: "AjouterAnnonceModal",
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    habitation: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      annonce: new Annonce({}),
      types: [
        "Maison",
        "Appartement",
        "Chambre",
        "Chalet",
        "Annulation gratuite"
      ],
      rules: {
        required: v => !!v || 'Ce champ est requis',
        numeric: v => Number(v) && Number(v) > 0 || "Le prix doit être positif"
      }
    }
  },
  watch: {
    'annonce.prix'(nV) {
      if(nV && nV < 0) this.annonce.prix = 0
    },
    'annonce.nombrePlace'(nV) {
      if(nV && nV < 0) this.annonce.nombrePlace = 0
    },
  },
  methods: {
    closeDialog() {
      this.$emit('change', false)
    },
    async ajouter() {
      if(!this.$refs.form.validate()) return

      try {
        await this.$store.dispatch('profil/ajouterAnnonce', { annonce: this.annonce, habitation: this.habitation })
        this.$nuxt.$emit('notification', false, "L'annonce a bien été ajoutée")
      } catch (e) {
        this.$nuxt.$emit('notification', true, e.message)
      } finally {
        this.closeDialog()
      }
    }
  }
};
</script>

<style scoped>

</style>
