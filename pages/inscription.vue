<template>
    <v-img
      class="ml"
      :src="require('./../static/background2.jpeg')"
      max-height="60%"
      max-width="100%"
    >
      <v-row justify="center" align="center" style="height: 700px">
        <v-col cols="12" sm="5" md="5" lg="5">
          <v-card ref="form" color="secondary" style="padding-top: 30px">
            <v-card-text>
              <v-text-field
                ref="nom"
                v-model="nom"
                background-color="white"
                outlined
                :rules="[() => !!nom || 'Ce champ est requis']"
                :error-messages="errorMessages"
                placeholder="Nom"
                label="Nom"
                required
              />
              <v-text-field
                ref="prenom"
                v-model="prenom"
                background-color="white"
                outlined
                :rules="[() => !!prenom || 'Ce champ est requis']"
                :error-messages="errorMessages"
                placeholder="Prénom"
                label="Prénom"
                required
              />
              <v-text-field
                ref="email"
                v-model="email"
                background-color="white"
                outlined
                :rules="[
                  () => !!email || 'Ce champ est requis',
                  () =>
                    (!!email && email.length <= 50) ||
                    'L\'email doit être inférieur à 50 characters',
                  EmailCheck,
                ]"
                label="Email"
                placeholder=""
                counter="50"
                required
              />
              <div style="padding-top: 4px">
                <v-text-field
                  v-model="password"
                  background-color="white"
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Mot de passe"
                  hint="Au moins 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </div>
              <div style="padding-top: 4px">
                <v-text-field
                  v-model="password2"
                  background-color="white"
                  outlined
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password2'"
                  name="input-10-1"
                  label="Confirmer mot de passe"
                  hint="Au moins 8 characters"
                  counter
                  @click:append="show2 = !show2"
                />
              </div>
            </v-card-text>
            <v-divider class="mt-2"></v-divider>
            <v-card-actions>
              <v-btn color="primary" text> Annuler </v-btn>
              <v-spacer />
                <v-btn color="primary" elevation="2" block @click="Envoyer">
                  S'inscrire
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
</template>

<script>
export default {
  layout: 'empty',
  data: () => ({
    errorMessages: '',
    nom: null,
    prenom: null,
    email: null,
    password: '',
    password2: '',
    show1: false,
    show2: false,
    formHasErrors: false,
    rules: {
      required: (value) => !!value || 'Requis',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  computed: {
    form() {
      return {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
      }
    },
  },

  watch: {
    nom() {
      this.errorMessages = ''
    },
    prenom() {
      this.errorMessages = ''
    },
  },

  methods: {
    EmailCheck() {
      this.errorMessages = this.email && !this.nom ? `Hey! Je suis requis` : ''

      return true
    },
    Envoyer() {
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate()
      })
    },
  },
}
</script>
