<template>
  <v-card width="100%" :loading="loading" @keyup.enter="envoyer">

    <v-img
      v-if="(habitation.photo && habitation.photo !== null) || photo !== null"
      class="align-end"
      height="200px"
      :src="photo !== null ? photo : habitation.photo"
      :class="edit === true ? 'imageCard' : ''"
      @click.stop="editPhoto"
    />

    <v-img
      v-else-if="edit === true && (habitation.photo === undefined || habitation.photo === null) && photo === null"
      class="align-end imageCard"
      height="200px"
      :src="require('@/static/empty.jpg')"
      @click.stop="editPhoto"
    />
    <v-file-input
      ref='fileInput'
      style="display: none"
      accept="image/png, image/jpeg"
      @change='fileChange'
    />

    <v-card-title>
      <div v-if="!edit">
        {{ habitation.description }}
      </div>
      <v-text-field
        v-else
        ref="desc"
        label="Titre"
        :value="habitation.description"
        hide-details
        dense />
    </v-card-title>

    <v-card-subtitle v-if="!edit">
      {{ adresse }}
    </v-card-subtitle>

    <v-card-subtitle v-else class="my-4">
      <v-row>
        <v-col cols="2">
          <v-text-field
            ref="numero"
            label="Numéro"
            :value="habitation.numero"
            hide-details
            type="number"
            :min="0"
            dense
          />
        </v-col>

        <v-col cols="3">
          <v-text-field
            ref="rue"
            label="Rue"
            :value="habitation.rue"
            hide-details
            dense
          />
        </v-col>

        <v-col cols="2">
          <v-text-field
            ref="code"
            label="Code postal"
            :value="habitation.code"
            hide-details
            dense
          />
        </v-col>

        <v-col cols="3">
          <v-text-field
            ref="ville"
            label="Ville"
            :value="habitation.ville"
            hide-details
            dense
          />
        </v-col>

        <v-col cols="2">
          <v-text-field
            ref="pays"
            label="Pays"
            :value="habitation.pays"
            hide-details="auto"
            dense
          />
        </v-col>
      </v-row>
    </v-card-subtitle>

    <v-card-text>

      <v-row>
        <v-col cols="3">
          <v-checkbox
            ref="wifi"
            :input-value="habitation.wifi"
            :disabled="!edit"
          >
            <template #label>
              <span>Wi-fi</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            ref="lave_linge"
            :input-value="habitation.lave_linge"
            :disabled="!edit"
          >
            <template #label>
              <span>Lave linge</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            ref="seche_linge"
            :input-value="habitation.seche_linge"
            :disabled="!edit"
          >
            <template #label>
              <span>Sèche-linge</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            ref="climatisation"
            :input-value="habitation.climatisation"
            :disabled="!edit"
          >
            <template #label>
              <span>Climatisation</span>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-checkbox
            ref="cuisine"
            :input-value="habitation.cuisine"
            :disabled="!edit"
          >
            <template #label>
              <span>Cuisine</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            ref="parking"
            :input-value="habitation.parking"
            :disabled="!edit"
          >
            <template #label>
              <span>Parking</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            ref="tv"
            :input-value="habitation.tv"
            :disabled="!edit"
          >
            <template #label>
              <span>TV</span>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>

    </v-card-text>

    <v-card-actions v-if="!edit">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab small rounded color="error"
            v-bind="attrs" v-on="on"
            @click.stop="showSupprModal = true"
          >
            <v-icon small>
              mdi-close
            </v-icon>
          </v-btn>
        </template>
        <span>Supprimer</span>
      </v-tooltip>
      <v-spacer />
      <v-btn rounded outlined color="info" @click.stop="showAjouterAnnonce = true">
        <v-icon left>
          mdi-plus
        </v-icon>
        Ajouter une annonce
      </v-btn>
      <v-btn rounded outlined color="primary" @click="modifier = true">
        <v-icon left>
          mdi-pencil
        </v-icon>
        Modifier
      </v-btn>
    </v-card-actions>

    <v-card-actions v-else>
      <v-spacer />
      <v-btn rounded outlined color="primary" @click="envoyer">
        <v-icon left>
          mdi-pencil
        </v-icon>
        Modifier
      </v-btn>
    </v-card-actions>

    <AjouterAnnonceModal :key="'A' + ajouterAnnonceKey" v-model="showAjouterAnnonce" :habitation="habitation"/>
    <ModifierHabitation v-if="!edit" :key="'B' + keyModal" v-model="modifier" :habitation="habitation" />
    <SuppressionModal v-model="showSupprModal" :habitation="habitation" />
  </v-card>
</template>

<script>
import ModifierHabitation from "@/components/habitations/HabitationModal";
import { Habitation } from "@/models/habitation";
import SuppressionModal from "@/components/habitations/SuppressionModal";
import AjouterAnnonceModal from "@/components/annonces/AjouterAnnonceModal";

export default {
  name: "HabitationCard",
  components: { SuppressionModal, ModifierHabitation, AjouterAnnonceModal },
  props: {
    habitation: {
      type: Object,
      default() {
        return {}
      }
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modifier: false,
      keyModal: 0,
      ajouterAnnonceKey: 0,
      loading: false,
      photo: null,
      showSupprModal: false,
      showAjouterAnnonce: false
    }
  },
  computed: {
    adresse() {
      return this.habitation.numero + ' ' + this.habitation.rue + ', ' + this.habitation.code + ' ' + this.habitation.ville + ', ' + this.habitation.pays
    }
  },
  watch: {
    modifier(nV) {
      if (nV === true) this.keyModal += 1
    },
    showAjouterAnnonce(nV) {
      if(nV === true) this.ajouterAnnonceKey += 1
    }
  },
  methods: {
    editPhoto() {
      if (!this.edit) return
      this.$refs.fileInput.$refs.input.click()
    },
    checkFileFormat(data) {
      if(data.size > 2000000) {
        this.$nuxt.$emit("notification", null, "La taille de l'image ne doit pas dépasser 2MB!");
        return false;
      }
      if(!data.type.match('image.*')) {
        this.$nuxt.$emit("notification", null, "Le document doit être une image !")
        return false
      }
      return true
    },
    fileChange(data) {
      if (data && typeof data === typeof Object()) {
        if (!this.checkFileFormat(data)) return;
        const reader = new FileReader()
        if (data.type.match('image.*')) {
          reader.readAsDataURL(data);
        }
        const self = this
        reader.onloadend = () => {
          self.photo = reader.result
        }
      }
    },
    async envoyer() {
      this.loading = true
      const h = this.habitation

       const habitation = new Habitation({
        idHabitation: h.idHabitation,
        description: this.$refs.desc.$el.querySelector('input').value,
        longitude: h.longitude,
        latitude: h.latitude,
        pays: this.$refs.pays.$el.querySelector('input').value,
        numero: this.$refs.numero.$el.querySelector('input').value,
        code: this.$refs.code.$el.querySelector('input').value,
        rue: this.$refs.rue.$el.querySelector('input').value,
        ville: this.$refs.ville.$el.querySelector('input').value,
        photo: this.photo ? this.photo : this.habitation.photo,
        wifi: this.$refs.wifi.$el.querySelector('input').checked,
        lave_linge: this.$refs.lave_linge.$el.querySelector('input').checked,
        seche_linge: this.$refs.seche_linge.$el.querySelector('input').checked,
        climatisation: this.$refs.climatisation.$el.querySelector('input').checked,
        parking: this.$refs.parking.$el.querySelector('input').checked,
        tv: this.$refs.tv.$el.querySelector('input').checked,
        cuisine: this.$refs.cuisine.$el.querySelector('input').checked
      })

      try {
        await this.$store.dispatch('profil/putHabitation', habitation)
      } catch (e) {
        this.$nuxt.$emit('notification', true, e.message)
      } finally {
        this.loading = false
        this.$emit('close')
      }
    }
  }
};
</script>

<style scoped lang="scss">
.col {
  padding-bottom: 0;
  padding-top: 0;
}

.imageCard:hover {
  cursor: pointer
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
