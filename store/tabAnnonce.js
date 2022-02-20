import { Annonce } from "@/models/annonce";
import { Habitation } from "@/models/habitation";

const INITIAL_VALUE = []
const ROUTE = '/annonces/search'

export const state = () => ({
  fetchedAnnonces: INITIAL_VALUE,
})

export const getters = {
  getTab: state => state.fetchedAnnonces,
}

export const mutations = {
  reset(state) {
    state.fetchedAnnonces = INITIAL_VALUE
  },
  set(state, annonces) {
    state.fetchedAnnonces = annonces.map(a => {
      a.idHabitation = new Habitation(a.idHabitation);
      return a
    })
  },
  /* filter(state, { type, commodites }) {
    let filtered = state.fetchedAnnonces
    if(type && type.length > 0) {
      filtered = filtered.filter(a => a.type === type[0].name)
    }

    console.log(commodites)
    if (commodites && commodites.length > 0) {
      commodites.forEach(c => {
        filtered = filtered.filter(a => a[c.key] === true);
      })
    }

    state.filteredAnnonces = filtered
  } */
}

export const actions = {
  async rechercher({ commit, rootState }) {
    const values = rootState.search.values

    const params = {}

    let nb = null;
    Object.keys(values).forEach(k => {
      switch (k) {
        case 'String': params.ville = values[k]
          break;
        case 'Date-debut': params.debut = values[k].split('-').reverse().join('-')
          break;
        case 'Date-fin': params.fin = values[k].split('-').reverse().join('-')
          break;
        case 'Object':
          nb = Object.entries(values.Object).reduce((total, value) => total + value[1], 0)
          if(nb > 0) params.nbPersonne = nb
          break;
      }
    })

    const res = await this.$axios.get(ROUTE, { params })

    if(res.status !== 200) throw new Error("Erreur lors de la recherche")
    else commit("set", res.data.map(a => new Annonce(a)));

  },
}
