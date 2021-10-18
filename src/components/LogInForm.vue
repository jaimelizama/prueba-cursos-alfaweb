<template>
  <div>
    <v-app id="user-login">
      <v-main>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title
                    >Inicia Sesión en Cursos AlfaWeb 🙂</v-toolbar-title
                  >
                </v-toolbar>
                <v-card-text class="mt-5">
                  <v-form @submit.prevent="submitLogInForm" class="mt-5">
                    <v-text-field
                      name="email"
                      label="Correo Electrónico"
                      type="email"
                      v-model="logInForm.email"
                      :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      name="password"
                      label="Clave"
                      type="password"
                      v-model="logInForm.password"
                      :rules="passwordRules"
                    ></v-text-field>
                    <v-card-actions class="justify-center my-5">
                      <v-btn color="primary" type="submit">Ingresar</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>

                <v-container class="text-center">
                  ¿No tienes cuenta?
                  <router-link :to="{ name: 'SignUp' }" class="nav-link"
                    >Regístrate Aquí</router-link
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
  name: 'UserLogIn',
  data: () => ({
    logInForm: {
      email: '',
      password: ''
    },
    email: '',
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
    submitLogInForm() {
      console.log('click on submit')
      console.log(this.logInForm)
      this.$store.dispatch('sessionModule/logIn', this.logInForm).then(
        () => {
          this.$swal.fire({
            position: 'top-end',
            title: '¡Genial! iniciaste sesión 😀',
            showConfirmButton: false,
            timer: 2000
          })
          this.$router.push('/home')
          //this.$swal.fire('¡Genial! iniciaste sesión 😀')
        },
        () => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `El correo o la contraseña son incorrectos. Intente Nuevamente`
          })
          //alert(`El correo o la contraseña son incorrectos. Intente Nuevamente`)
        }
      )
      this.$store.dispatch('sessionModule/subscribeToAuthStateChange')

      //   Firebase.auth()
      //     .signInWithEmailAndPassword(
      //       this.logInForm.email,
      //       this.logInForm.password
      //     )
      // .then(
      //   () => {
      //     this.$router.push('/home')
      //   },
      //   () => {
      //     alert(
      //       `El correo o la contraseña son incorrectos. Intente Nuevamente`
      //     )
      //   }
      // )
      // }
    }
  }
}
</script>

<style></style>
