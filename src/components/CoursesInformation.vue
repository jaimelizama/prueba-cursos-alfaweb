<template>
  <v-container class="mt-12">
    <h5>Información:</h5>
    <v-alert
      outlined
      color="purple"
      dark
      icon="mdi-account-group ml-3"
      border="left"
    >
      Cantidad total de alumnos permitidos:
      <strong>{{
        $store.getters['coursesModule/totalNumberOfStudentsAllowed']
      }}</strong>
      alumnos
    </v-alert>
    <v-alert
      outlined
      color="blue"
      dark
      icon="mdi-account-multiple-check ml-3"
      border="left"
    >
      Cantidad total de alumnos inscritos:
      <strong>{{
        $store.getters['coursesModule/totalNumberOfEnrolledStudents']
      }}</strong>
      alumnos
    </v-alert>
    <v-alert
      outlined
      color="orange darken-4"
      dark
      icon="mdi-account-clock ml-3"
      border="left"
    >
      Cantidad total de cupos restantes:
      <strong>{{
        $store.getters['coursesModule/totalNumberOfSeatsRemaining']
      }}</strong>
      alumnos
    </v-alert>
    <v-alert outlined color="pink" dark icon="mdi-cancel ml-3" border="left">
      Cantidad total de cursos terminados:
      <strong>{{
        $store.getters['coursesModule/totalNumberOfCoursesCompleted']
      }}</strong>
      cursos
    </v-alert>
    <v-alert
      outlined
      color="brown"
      dark
      icon="mdi-bell-ring ml-3"
      border="left"
    >
      Cantidad total de cursos activos:
      <strong>{{
        $store.getters['coursesModule/totalNumberOfActiveCourses']
      }}</strong>
      cursos
    </v-alert>
    <v-alert
      outlined
      color="orange accent-4"
      dark
      icon="mdi-book-open ml-3"
      border="left"
    >
      Cantidad total de cursos:
      <strong>{{ $store.state.coursesModule.courses.length }}</strong>
      cursos
    </v-alert>
  </v-container>
</template>

<script>
export default {
  name: 'CoursesInformation'
}
</script>

<style></style>
