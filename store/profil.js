import { Habitation } from "@/models/habitation";
import { Annonce } from "@/models/annonce";
import { Disponibilites } from "@/models/disponibilites";

const HABITATIONS = '/habitations'
const ANNONCES = '/annonces'

export const state = () => ({
  habitations: null,
  annonces: null,
})

export const getters = {
  getHabitations: state => state.habitations,
  getAnnonces: state => state.annonces,
}

export const mutations = {
  reset(state) {
    state.habitations = null;
    state.annonces = null;
  },
  setHabitations(state, habitations) {
    state.habitations = habitations
  },
  ajouterHabitation(state, habitation) {
    const hab = new Habitation(habitation)
    if (state.habitations === null) {
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
  },
  setAnnonces(state, annonces) {
    state.annonces = annonces
  },
  supprimerAnnonce(state, id) {
    state.annonces = state.annonces.filter(a => a.idAnnonce !== id)
  },
  ajouterAnnonce(state, annonce) {
    const ann = new Annonce(annonce)
    if (state.annonces === null) {
      state.annonces = [ann]
    } else state.annonces.push(ann)
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
      const habitations = res.data.map(h => new Habitation(h))
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
  },

  async postHabitation({ commit, rootState }, habitation) {
    const photo = habitation.photo
    habitation.photo = null
    const res = await this.$axios.post(HABITATIONS, { habitation, photo }, {
      params: {
        idPersonne: rootState.session.currentUser.id
      }
    })
    if (res.status !== 200) throw new Error('Erreur lors de l\'ajout de l\'habitation')
    else {
      const hab = new Habitation(res.data)
      if (hab.photo && !hab.photo.includes('base64')) hab.photo = 'data:image/jpeg;base64,' + hab.photo
      commit("ajouterHabitation", hab);
    }
  },

  async fetchAnnonces({ commit, rootState }) {
    const userID = rootState.session.currentUser.id
    const res = await this.$axios.get(ANNONCES + '/user', {
      params: {
        id: userID
      }
    })
    if(res.status !== 200) throw new Error('Erreur lors de la récupération des annonces')
    else {
      commit("setAnnonces", res.data.map(a => new Annonce(a)));
    }
  },

  async deleteAnnonce({ commit }, id) {
    const res = await this.$axios.delete(ANNONCES, {
      params: { id }
    })

    if (res.status !== 200) throw new Error("Erreur lors de la suppression de l'annonce")
    else {
      commit('supprimerAnnonce', id)
    }
  },

  async ajouterAnnonce({ commit }, { annonce, habitation }) {

    annonce.prix = Number(annonce.prix)
    annonce.idHabitation = new Habitation({ ...habitation })
    annonce.idHabitation.photo = null

    annonce.disponibilites = [
      new Disponibilites({
        idDisponibilite: null,
        debut: new Date(Date.now()).toISOString().split('T')[0],
        fin: "2050-01-02"
      })
    ]

    const res = await this.$axios.post(ANNONCES, annonce)

    if (res.status !== 200) throw new Error('Erreur lors de l\'ajout de l\'annonce')
    else {
      commit('ajouterAnnonce', res.data)
    }
  }
}
