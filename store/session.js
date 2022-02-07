import {Utilisateur} from "@/models/utilisateur";

export const state = () => ({
  authenticated: false,
  currentUser: null
})

export const mutations = {
  deconnexion(state) {
    state.authenticated = false
    state.currentUser = null
  }
}

export const actions = {
  async connexion({ state }, { email, password }) {
    const res = await this.$axios.get('/connexion/login', {
      params: {
        identifiant: email,
        password
      }
    })
    if (res.status === 200) {
      state.authenticated = true
      state.currentUser = new Utilisateur(res.data)
      await this.$router.push('/')
    } else if(res.status === 204) throw new Error("Le mot de passe et l'email ne correspondent pas")
    else throw new Error("Erreur inconnue")
  },

  async inscription({ state }, user) {
    try {
      const res = await this.$axios.post('/connexion/register', { ...user })
      if (res.status === 200) {
        state.authenticated = true
        state.currentUser = new Utilisateur(user)
        await this.$router.push('/')
      }
    } catch (e) {
      if (e.message.includes('409')) {
        throw new Error("L'email est déjà associé à un compte")
      } else throw new Error("Erreur inconnue")
    }

  }
}
