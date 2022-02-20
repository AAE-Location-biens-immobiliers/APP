<template>
  <v-container fluid class="background pa-0 ma-0">

    <v-tooltip right>
      <template #activator="{ on, attrs }">
        <v-btn fab
               rounded
               style="position: fixed"
               class="ma-5" color="accent"
               v-bind="attrs" v-on="on"
               @click="$router.back()"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </template>
      <span>Retourner aux annonces</span>
    </v-tooltip>

    <div v-if="$store.getters['session/isAuth'] && $store.getters['session/getUser'].locataire === false"
         class="mt-7 mr-5"
         style="position: fixed; right: 0"
    >
      <v-tooltip left>
        <template #activator="{ on, attrs }">
          <v-btn
            rounded color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>
              mdi-credit-card-outline
            </v-icon>
            Réserver
          </v-btn>
        </template>
        <span>Vous devez avoir un compte locataire pour effectuer une réservation !</span>
      </v-tooltip>
    </div>

    <v-btn v-else
           rounded color="primary"
           style="position: fixed; right: 0"
           class="mt-7 mr-5"
           @click="reserver">
      <v-icon left>
        mdi-credit-card-outline
      </v-icon>
      Réserver
    </v-btn>

    <v-container class="mb-10">
      <v-card>

        <v-dialog v-if="isPhoto" v-model="expand" hide-overlay>
          <template #activator="{ on, attrs }">
            <v-img
              class="align-end photo"
              max-height="250"
              v-bind="attrs"
              :src="annonce.idHabitation.photo"
              v-on="on"
            />
          </template>

          <v-img
            v-if="isPhoto"
            max-height='90vh'
            contain
            :src="annonce.idHabitation.photo"
            class="grey darken-4"
            @click.stop='expand = false'
          />
        </v-dialog>

        <v-img
          v-else
          class="align-end"
          max-height="250"
          :src="require('@/static/empty.jpg')"
        />

        <v-card-title class="white--text info">
          {{ annonce.description }}
        </v-card-title>

        <v-card-subtitle v-if="anyValue" class="white--text info">
          <div v-if="values['Date-debut'] && values['Date-fin']">
            <span >Du {{ afficherDate(values['Date-debut']) }} au {{ afficherDate(values['Date-fin']) }}</span>
            <br />
          </div>
          <div v-if="values['String']">
            <span>A {{ values['String'] }}</span>
            <br />
          </div>
          <div v-if="values['Object'] && Object.entries(values['Object']).reduce((total, value) => total + value[1], 0) !== 0">
            <span>Pour {{ values['Object'].Adultes }} adultes, {{ values['Object'].Enfants }} enfants et {{ values['Object']["Bébés"] }} bébés</span>
          </div>
        </v-card-subtitle>

        <v-container fluid>

          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="items"
            item-key="name"
            open-on-click
          >
            <template #prepend="{ item, open }">
              <v-icon v-if="item.children">
                {{ open ? item.openIcon ? item.openIcon : 'mdi-folder-open' : item.closeIcon ? item.closeIcon : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ item.icon }}
              </v-icon>
            </template>
          </v-treeview>

          <v-divider />

          <AvisList :avis="avis" @supprimer="supprimer" />

          <div v-if="$store.getters['session/isAuth']">
            <v-row no-gutters>
              <v-col cols="10">
                <v-text-field
                  v-model="commentaire"
                  label="Commentaire"
                  outlined
                  hide-details
                  clearable
                  @keyup.enter="commenter"
                />
              </v-col>
              <v-col
                cols="2"
                class="align-self-center text-center"
                @click.stop="commenter"
              >
                <v-btn color="info" :loading="loadingCommentaire">
                  Commenter
                </v-btn>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-rating
                v-model="etoile"
                hover
                length="5"
                size="15"
              />
            </v-row>
          </div>

          <div v-else>
            <span>Vous devez être connecté pour pouvoir commenter</span>
            <v-tooltip top>
              <template #activator="{ attrs, on }">
                <v-btn
                  class="ml-5"
                  x-small
                  fab
                  rounded
                  color="info"
                  outlined
                  v-bind="attrs"
                  @click.stop="showAuth = true"
                  v-on="on"
                >
                  <v-icon>
                    mdi-fingerprint
                  </v-icon>
                </v-btn>
              </template>
              <span>Se connecter</span>
            </v-tooltip>
          </div>
        </v-container>

      </v-card>
    </v-container>
    <AuthModal v-model="showAuth" />
  </v-container>
</template>

<script>
import { Annonce } from "@/models/annonce";
import AuthModal from "@/components/auth/AuthModal";
import AvisList from "@/components/annonces/AvisList";
import { Avis } from "@/models/avis";
import { Reservation } from "@/models/reservation";

export default {
  name: "Slug",
  components: { AvisList, AuthModal },
  layout: 'empty',
  async asyncData(ctx) {
    const slug = ctx.params.slug

    const retrieveAnnonce = ctx.store.getters["tabAnnonce/getTab"].filter(t => t.idAnnonce === Number(slug))

    if (!retrieveAnnonce.length) {
      ctx.error({ statusCode: 404, message: 'Page non trouvée' })
    }

    const annonce = new Annonce(retrieveAnnonce[0])

    let avis = []
    try {
      avis = (await ctx.$axios.get('/annonces/avis', {
        params: {
          idAnnounce: annonce.idAnnonce
        }
      })).data
    } catch (e) {}

    return { annonce, avis }
  },
  data() {
    return {
      expand: false,
      showAuth: false,
      tree: [],
      items:[],
      initiallyOpen: [
        'A propos de l\'habitation',
      ],
      commentaire: '',
      etoile: 5,
      loadingCommentaire: false
    }
  },
  computed: {
    adresse() {
      return this.annonce.idHabitation.numero + ' ' + this.annonce.idHabitation.rue + ', ' + this.annonce.idHabitation.code + ' ' + this.annonce.idHabitation.ville + ', ' + this.annonce.idHabitation.pays
    },
    values() {
      return this.$store.getters["search/getValues"]
    },
    isPhoto() {
      return this.annonce.idHabitation && this.annonce.idHabitation.photo
    },
    anyValue() {
      return this.values && ((this.values['Date-debut'] && this.values['Date-fin']) || this.values.String || (this.values.Object && this.values.Object !== {}))
    },
    habitation() {
      return this.annonce.idHabitation
    }
  },
  created() {
    this.items = [
      {
        name: "A propos de l'habitation",
        children: [
          {
            name: "Adresse : " + this.adresse,
            icon: "mdi-google-maps"
          },
          {
            name: 'Type d\'habitation : ' + this.annonce.type,
            icon: "mdi-map-marker-question"
          },
          {
            name: 'Prix : ' + this.annonce.prix + ' € / nuit',
            icon: 'mdi-bitcoin'
          },
          {
            name: "Caractéristiques",
            openIcon: "mdi-dots-horizontal-circle-outline",
            closeIcon: "mdi-dots-vertical-circle-outline",
            children: [
              {
                name: "Wi-fi",
                icon: this.habitation.wifi ? "mdi-check-outline" : "mdi-close-outline"
              },
              {
                name: "Lave-linge",
                icon: this.habitation.lave_linge ? "mdi-check-outline" : "mdi-close-outline"
              },
              {
                name: "Sèche-linge",
                icon: this.habitation.seche_linge ? "mdi-check-outline" : "mdi-close-outline"
              },
              {
                name: "Climatisation",
                icon: this.habitation.climatisation ? "mdi-check-outline" : "mdi-close-outline"
              },
              {
                name: "Cuisine",
                icon: this.habitation.cuisine ? "mdi-check-outline" : "mdi-close-outline"
              },
              {
                name: "Parking",
                icon: this.habitation.parking ? "mdi-check-outline" : "mdi-close-outline"
              },
              {
                name: "TV",
                icon: this.habitation.tv ? "mdi-check-outline" : "mdi-close-outline"
              },

            ]
          }
        ]
      }
    ]
  },
  methods: {
    afficherDate(date) {
      const months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
      const splitted = String(date).split('-')
      return splitted[0] + ' ' + months[Number(splitted[1] - 1)] + ' ' + splitted[2];
    },
    async reserver() {
      if(!this.values['Date-debut'] && !this.values['Date-fin']) {
        this.$nuxt.$emit('notification', null, "Sélectionnez une date d'arrivée et de départ svp !")
        return
      }

      if(!this.$store.getters["session/isAuth"]) {
        this.showAuth = true
        return
      }

      this.$nuxt.$emit('overlay', true)
      try {

        const reservations = new Reservation({
          dateReservationDebut: this.values['Date-debut'].split('-').reverse().join('-'),
          dateReservationFin: this.values['Date-fin'].split('-').reverse().join('-')
        })

        const params = {
          idLocataire: this.$store.getters["session/getUser"].id,
          idAnnonce: this.annonce.idAnnonce
        }

        console.log(reservations, params)

        const res = await this.$axios.post('/reservations', { reservations }, { params })
        if(res.status !== 200) throw Error
        this.$nuxt.$emit('notification', false, "Réservation effectuée !")
      } catch (e) {
        this.$nuxt.$emit('notification', true, "Erreur lors de la réservation !")
      } finally {
        this.$nuxt.$emit('overlay', false)
      }

    },
    async commenter() {
      this.loadingCommentaire = true

      const avis = new Avis({
        commentaire: this.commentaire,
        etoile: this.etoile
      })

      try {
        const params = {
          idWriter: this.$store.getters["session/getUser"].id,
          idLogement: this.annonce.idHabitation.idHabitation
        }
        const res = await this.$axios.post('/avis', avis, { params })

        if(res.status !== 200) throw Error

        res.data.idWriter= this.$store.getters["session/getUser"]

        this.avis.push(new Avis(res.data))
        this.commentaire = ''
        this.etoile = 5
        this.$nuxt.$emit('notification', false, 'Le commentaire a bien été ajouté')
      } catch (e) {
        this.$nuxt.$emit('notification', true, 'Erreur lors de l\'ajout de votre commentaire')
      } finally {
        this.loadingCommentaire = false
      }
    },
    async supprimer(i) {
      try {
        const avis = this.avis[i]

        const res = await this.$axios.delete('/avis', {
          params: {
            id: avis.idAvis
          }
        })

        if (res.status !== 200) throw Error

        this.avis.splice(i, 1)
        this.$nuxt.$emit('notification', false, 'L\'avis a bien été supprimé')
      } catch (e) {
        this.$nuxt.$emit('notification', true, 'Erreur lors de la suppression de l\'avis')
      }
    }
  }
};
</script>

<style scoped lang="scss">
.background {
  background-color: #dbf3fb;
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.photo:hover {
  cursor: pointer;
}
</style>
