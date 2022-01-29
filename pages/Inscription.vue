<template>
  <v-container fluid class="pa-0" >
    <v-img
      v-bind="props"
      class="ml"
      :src="require('./../static/background2.jpeg')"
      max-height="60%"
      max-width="100%"
      :height="bgHeight"
    >
      <v-row justify="center" align="center" style="height: 700px">
        <v-col cols="12" sm="5" md="5" lg="5">
          <v-card ref="form" color="secondary" style="paddingtop: 30px">
            <v-card-text>
              <v-text-field
                background-color="white"
                outlined
                ref="Nom"
                v-model="Nom"
                :rules="[() => !!Nom || 'Ce champ est requis']"
                :error-messages="errorMessages"
                label="Nom"
                placeholder=""
                required
              ></v-text-field>
              <v-text-field
                background-color="white"
                outlined
                ref="Prenom"
                v-model="Prenom"
                :rules="[() => !!Prenom || 'Ce champ est requis']"
                :error-messages="errorMessages"
                label="Prénom"
                placeholder=""
                required
              ></v-text-field>
              <v-text-field
                background-color="white"
                outlined
                ref="Email"
                v-model="Email"
                :rules="[
                  () => !!Email || 'Ce champ est requis',
                  () =>
                    (!!Email && Email.length <= 50) ||
                    'L\'email doit être inférieur à 50 characters',
                  EmailCheck,
                ]"
                label="Email"
                placeholder=""
                counter="50"
                required
              ></v-text-field>
              <div style="paddingtop: 4px">
                <v-text-field
                  background-color="white"
                  outlined
                  v-model="password"
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
              <div style="paddingtop: 4px">
                <v-text-field
                  background-color="white"
                  outlined
                  v-model="password2"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password2'"
                  name="input-10-1"
                  label="Confirmer mot de passe"
                  hint="Au moins 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </div>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-btn color="primary" text> Annuler </v-btn>
              <v-spacer></v-spacer>
              <v-col cols="5" sm="4">
                <v-btn color="primary" elevation="2" block @click="Envoyer">
                  S'inscrire
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    errorMessages: '',
    Nom: null,
    Prenom: null,
    Email: null,
    password: '',
    password2: '',
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
        Nom: this.Nom,
        Prenom: this.Prenom,
        Email: this.Email,
      }
    },
  },

  watch: {
    Nom() {
      this.errorMessages = ''
    },
    Prenom() {
      this.errorMessages = ''
    },
  },

  methods: {
    EmailCheck() {
      this.errorMessages = this.Email && !this.Nom ? `Hey! Je suis requis` : ''

      return true
    },
    Envoyer() {
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })
    },
  },
}
</script>