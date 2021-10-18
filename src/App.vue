<template>
  <v-app>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
//import Firebase from 'firebase'
//import UserLogin from './views/UserLogin.vue'
export default {
  name: 'App',

  data: () => ({
    //cursos: []
  })

  /*
   * Revisar conexión a Firestore
   */
  // mounted() {
  //   Firebase.firestore()
  //     .collection('cursos')
  //     .get()
  //     .then((documents) => {
  //       documents.forEach((document) => {
  //         this.cursos.push({ id: document.id, ...document.data() })
  //       })
  //     })
  // }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
