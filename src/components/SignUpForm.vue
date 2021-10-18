<template>
  <div>
    <v-app id="user-signup">
      <v-main>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Registro de Usuario 💻</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="mt-5">
                  <v-form @submit.prevent="submitSignUpForm" class="mt-5">
                    <v-text-field
                      name="email"
                      label="Correo Electrónico"
                      type="email"
                      v-model="signUpForm.email"
                      :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      name="password"
                      label="Clave (debe contener al menos 6 dígitos)"
                      type="password"
                      v-model="signUpForm.password"
                      :rules="passwordRules"
                    ></v-text-field>
                    <v-card-actions class="justify-center mt-5">
                      <v-btn color="primary" type="submit">Registrar</v-btn>
                    </v-card-actions>
                    <v-flex class="text-center"
                      >Al registrarte, tendrás que iniciar sesión con tus
                      credenciales</v-flex
                    >
                  </v-form>
                </v-card-text>

                <v-container class="text-center">
                  ¿Ya tienes cuenta?
                  <router-link :to="{ name: 'LogIn' }" class="nav-link"
                    >Inicia sesión aquí</router-link
                  >
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
//import Firebase from 'firebase'
export default {
  name: 'UserSignUp',
  data: () => ({
    signUpForm: {
      email: '',
      password: ''
    },
    emailRules: [
      (v) => !!v || 'E-mail es requerido',
      (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
    ],
    passwordRules: [
      (v) => !!v || 'Este campo es requerido',
      (v) =>
        v.length >= 6 || 'La contraseña debe contener al menos 6 caracteres'
    ]
  }),
  methods: {
    submitSignUpForm() {
      console.log('click on register')
      console.log(this.signUpForm)
      this.$store.dispatch('sessionModule/signUp', this.signUpForm).then(
        () => {
          this.$swal.fire({
            position: 'top-end',
            title: '¡Registrado! 😀 Vuelve a iniciar sesión',
            showConfirmButton: false,
            timer: 2000
          })
          this.$router.push('/login')
        },
        () => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `El correo o la contraseña son incorrectos. Intente Nuevamente`
          })
        }
      )

      //   Firebase.auth()
      //     .createUserWithEmailAndPassword(
      //       this.signUpForm.email,
      //       this.signUpForm.password
      //     )
      //     .then(
      //       () => {
      //         this.$router.push('/login')
      //       },
      //       () => {
      //         alert(
      //           `El correo o la clave no cumple los requisitos. Intenta nuevamente`
      //         )
      //       }
      //     )
    }
  }
}
</script>

<style></style>
