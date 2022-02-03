import {Utilisateur} from "@/models/utilisateur";

export const state = () => ({
  authenticated: false,
  currentUser: null
})

export const actions = {
  async connexion(state, { email, password }) {
    const utilisateur = await this.$axios.get('/connexion/login', {
      params: {
        identifiant: email,
        password
      }
    })
    state.currentUser = new Utilisateur(utilisateur)
    await this.$router.push('/')
  }
}
