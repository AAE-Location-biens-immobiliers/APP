<template>
  <v-row justify="center" align="center" style="height: 500px">
    <v-col cols="5" sm="3" md="4">
      <v-card color="secondary" style="paddingTop:30px">
        <div class="d-flex flex-column justify-space-between align-center">
          <v-col cols="5" sm="8">
            <div>
              <v-text-field
                background-color="white"
                label="Pseudo"
                outlined
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </div>
            <div style='paddingTop:4px'>
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
          </v-col>
          <v-col cols="5" sm="5">
            <v-btn color="primary" elevation="2" block> Connexion </v-btn>
          </v-col>

          <v-col cols="5" sm="5">
            <v-btn color="primary" elevation="2" block> Inscription </v-btn>
          </v-col>
        </div>
        <v-card-text
          class="d-flex flex-column justify-space-between align-center"
        >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
   data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
    }
  },
}
</script>

<style  scoped>
</style>