import { Annonce } from "@/models/annonce";
import { Habitation } from "@/models/habitation";

const INITIAL_VALUE = null

export const state = () => ({
  currentAnnonce: INITIAL_VALUE,
})

export const getters = {
  getCurrentAnnonce: state => state.currentAnnonce,
}

export const mutations = {
  reset(state) {
    state.currentAnnonce = INITIAL_VALUE
  },
  set(state, annonce) {
    if (typeof annonce !== typeof Annonce) annonce = new Annonce(annonce)
    annonce.idHabitation = new Habitation(annonce.idHabitation)
    state.currentAnnonce = annonce
  },
}
