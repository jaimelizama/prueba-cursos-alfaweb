<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <v-container>
        <CoursesCard></CoursesCard>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CoursesCard from '../components/CoursesCard.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    CoursesCard
  }
}
</script>

<style></style>
