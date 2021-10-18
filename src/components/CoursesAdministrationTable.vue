<template>
  <v-container class="mt-0">
    <v-data-table
      :headers="headers"
      :items="$store.state.coursesModule.courses"
      class="elevation-1"
      ><template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listado de Cursos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:[`item.costo`]="{ item }">
        <v-chip color="success">${{ item.costo.toLocaleString() }}</v-chip>
      </template>

      <template v-slot:[`item.estado`]="{ item }">
        <v-chip :color="item.estado ? 'info' : 'grey'">
          {{ item.estado ? 'Si' : 'No' }}
        </v-chip>
      </template>

      <template v-slot:[`item.fecha_creacion`]="{ item }">
        <v-chip color="success">
          {{ item.fecha_creacion ? item.fecha : 'Sin información' }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn icon @click="$router.push(`/course-edit/${item.id}`)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteCourse(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'CoursesAdministrationTable',
  mounted() {
    this.$store.dispatch('coursesModule/getAllCourses')
  },
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Curso', value: 'nombre' },
      { text: 'Cupos', value: 'cupos' },
      { text: 'Inscritos', value: 'inscritos' },
      { text: 'Duración', value: 'duracion' },
      { text: 'Costo', value: 'costo' },
      { text: 'Terminado', value: 'estado' },
      { text: 'Fecha', value: 'fecha' },
      { text: 'Acciones', value: 'actions' }
    ]
  }),
  methods: {
    // async deleteCourse(item) {
    //   console.log('click on delete course')
    //   await this.$store.dispatch('coursesModule/deleteCourse', item)
    //   this.$store.dispatch('coursesModule/getAllCourses')
    // }
    async deleteCourse(item) {
      console.log('click on delete course')
      this.$swal({
        title: '¿Estas seguro de querer eliminar este curso?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF5350',
        cancelButtonColor: '#546E7A',
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('coursesModule/deleteCourse', item)
          this.$swal.fire('Curso eliminado', '', '🗑️').then(() => {
            this.$store.dispatch('coursesModule/getAllCourses')
          })
        }
      })
      await this.$store.dispatch('coursesModule/getAllCourses')
    }
  },
  computed: {}
}
</script>

<style></style>
