<template>
  <div>
    <Navbar></Navbar>
    <div>
      <AddCourseForm></AddCourseForm>
      <CoursesAdministrationTable></CoursesAdministrationTable>
      <CoursesInformation></CoursesInformation>
    </div>
  </div>
</template>

<script>
// import Firebase from 'firebase'
import Navbar from '../components/Navbar.vue'
import AddCourseForm from '../components/AddCourseForm.vue'
import CoursesAdministrationTable from '../components/CoursesAdministrationTable.vue'
import CoursesInformation from '../components/CoursesInformation.vue'
export default {
  components: {
    Navbar,
    AddCourseForm,
    CoursesAdministrationTable,
    CoursesInformation
  },
  data: () => ({}),
  methods: {},
  computed: {}
}
</script>

<style scoped></style>
