import {Utilisateur} from "@/models/utilisateur";

export const state = () => ({
  currentUser: null
})

export const getters = {
  isAuth(state) {
    return state.currentUser !== null
  },
  getUser(state) {
    return state.currentUser
  }
}

export const mutations = {
  connexion(state, user) {
    state.currentUser = new Utilisateur(user)
  },
  deconnexion(state) {
    state.currentUser = null
  }
}

export const actions = {
  async connexion({ state, commit }, credentials) {
    const res = await this.$axios.get('/connexion/login', {
      params: credentials
    })
    if (res.status === 200) {
      commit('connexion', res.data)
      await this.$router.push('/')
    } else if(res.status === 204) throw new Error("Le mot de passe et l'email ne correspondent pas")
    else throw new Error("Erreur inconnue")
  },

  async inscription({ state, commit }, user) {
    try {
      const res = await this.$axios.post('/connexion/register', { ...user })
      if (res.status === 200) {
        commit('connexion', user)
        await this.$router.push('/')
      }
    } catch (e) {
      if (e.message.includes('409')) {
        throw new Error("L'email est déjà associé à un compte")
      } else throw new Error("Erreur inconnue")
    }

  }
}
