<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      color="indigo darken-2"
      class="white--text"
      ><v-row justify="space-around" class="mt-12">
        <v-avatar color="deep-purple accent-1" size="100">
          <v-icon dark size="80">mdi-account-circle</v-icon>
        </v-avatar>
      </v-row>
      <v-list class="white--text mt-8">
        <v-list-item
          v-for="(item, $index) in items"
          :key="$index"
          link
          :to="item.to"
          class="text-decoration-none"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue" class="white--text">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
      <v-spacer></v-spacer>
      {{ $store.getters['sessionModule/getUserEmail'] }}
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="signOutFirebase"
            ><v-icon class="white--text">mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Cerrar Sesión</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
//import Firebase from 'firebase'
export default {
  name: 'Navbar',
  data: () => ({
    user: null,
    drawer: false,
    items: [
      {
        title: 'Listado',
        icon: 'mdi-apps',
        to: '/home'
      },
      {
        title: 'Administración',
        icon: 'mdi-home',
        to: '/admin'
      }
    ]
  }),
  methods: {
    signOutFirebase() {
      this.$store.dispatch('sessionModule/signOut').then(() => {
        console.log('Sign-out successful')
        this.$swal.fire({
          position: 'top-end',
          title: '¡Bye bye! 👋',
          showConfirmButton: false,
          timer: 2000
        })
        this.$router.push(`/login`)
      })

      //   Firebase.auth()
      //     .signOut()
      //   .then(() => {
      //     console.log("Sign-out successful")
      //     this.$router.push(`/login`)
      //   })
    }
  }
}
</script>
