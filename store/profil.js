import { Habitation } from "@/models/habitation";

const HABITATIONS = '/habitations'

export const state = () => ({
  habitations: null,
  annonces: null,
  avis: null
})

export const getters = {
  getHabitations: state => state.habitations,
  getAnnonces: state => state.annonces,
  getAvis: state => state.avis
}

export const mutations = {
  setHabitations(state, habitations) {
    state.habitations = habitations
  },
  addHabitation(state, habitation) {
    const hab = new Habitation(habitation)
    if (this.getHabitations() === null) {
      state.habitations = [hab]
    } else state.habitations.push(hab)
  },
  changeHabitation(state, habitation) {
    state.habitations = state
      .habitations
      .map(h => h.id === habitation.id ? habitation : h)
  },
  supprimerHabitation(state, id) {
    state.habitations = state.habitations.filter(h => h.idHabitation !== id)
  }
}

export const actions = {
  async fetchHabitations({ commit, rootState }) {
    const userID = rootState.session.currentUser.id
    const res = await this.$axios.get(HABITATIONS, {
        params: {
          id: userID
        }
      })
    if (res.status === 200) {
      const habitations = res.data.map(h => {
        const hab = new Habitation(h);

        if (hab.photo && !hab.photo.includes('base64')) hab.photo = 'data:image/jpeg;base64,' + h.photo
        return hab
      })
      commit('setHabitations', habitations)
    } else throw new Error("Erreur lors de la récupération des habitations")
  },

  async putHabitation({ commit }, habitation) {
    const photo = habitation.photo
    habitation.photo = null

    const formData = new FormData()
    formData.append("habitation", habitation)
    formData.append("photo", photo)

    const res = await this.$axios.put(HABITATIONS, { habitation, photo }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) {
      habitation.photo = photo
      habitation = new Habitation(habitation)
      commit('changeHabitation', habitation)
    } else throw new Error('Erreur lors de la modification de l\'habitation ' + habitation.description)
  },

  async deleteHabitation({ commit }, id) {
    const res = await this.$axios.delete(HABITATIONS, {
      params: {
        id
      }
    })

    if(res.status !== 200) throw new Error("Erreur lors de la suppression de l'habitation")
    else commit('supprimerHabitation', id)
  }
}
