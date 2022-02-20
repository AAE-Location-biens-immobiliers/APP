<template>
  <v-dialog :value="show" persistent max-width="400">
    <v-card>

      <v-card-title class="white--text primary">
        Connexion
      </v-card-title>

      <v-form ref="form">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                background-color="white"
                label="E-mail"
                outlined
                :rules="[rules.required, rules.emailFormat]"
                hide-details="auto"
              />
            </v-col>
          </v-row>


          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                background-color="white"
                outlined
                :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="eye ? 'text' : 'password'"
                label="Mot de passe"
                counter
                @click:append="eye = !eye"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-divider />

      <v-card-actions>
        <v-btn rounded text color="error" @click.stop="$emit('change', false)">Annuler</v-btn>
        <v-spacer />
        <v-btn rounded text color="primary" :loading="loading" @click.stop="connexion">
          <v-icon left>
            mdi-fingerprint
          </v-icon>
          Se connecter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AuthModal",
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      eye: false,
      password: '',
      email: '',
      rules: {
        required: (value) => !!value || 'Ce champ est requis',
        min: (v) => v.length >= 8 || 'Minimum 8 caractères',
        emailFormat: (v) => this.emailMatchFormat(v) || "L'e-mail n'est pas au bon format"
      },
      loading: false
    }
  },
  computed: {
    utilisateur() {
      return this.$store.getters["session/getUser"]
    }
  },
  methods: {
    emailMatchFormat(email) {
      return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    },
    async connexion() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          await this.$store.dispatch('session/connexion', {
            email: this.email,
            password: this.password
          })
          this.$nuxt.$emit('notification', false, "Connecter en tant que " + this.utilisateur.prenom + " " + this.utilisateur.nom)
          this.$emit('change', false)
        } catch (e) {
          this.$nuxt.$emit('notification', true, e.message)
        } finally {
          this.loading = false
        }
      }

    }
  }
};
</script>

<style scoped>

</style>
