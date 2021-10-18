<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Curso</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="editForm" @submit.prevent="editCourse">
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  :disabled="loading"
                  v-model="course.codigo"
                  label="Código"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field
                  :disabled="loading"
                  v-model="course.nombre"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :disabled="loading"
                  v-model="course.descripcion"
                  label="Descripción"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :disabled="loading"
                  v-model="course.costo"
                  type="number"
                  min="0"
                  max="1000000"
                  step="10000"
                  label="Costo"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :disabled="loading"
                  v-model="course.cupos"
                  type="number"
                  min="0"
                  label="Cupos"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :disabled="loading"
                  v-model="course.inscritos"
                  type="number"
                  min="0"
                  label="Inscritos"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :disabled="loading"
                  v-model="course.fecha"
                  label="Fecha"
                  required
                  hint="formato dd/mm/aaaa"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :disabled="loading"
                  v-model="course.duracion"
                  :items="[
                    '1 mes',
                    '2 meses',
                    '3 meses',
                    '4 meses',
                    '5 meses',
                    '6 meses'
                  ]"
                  label="Duración"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-switch
                  :disabled="loading"
                  v-model="course.estado"
                  label="Terminado"
                  required
                ></v-switch>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :disabled="loading"
                  v-model="course.imagen"
                  label="Imagen"
                  required
                  hint="Pega la URL de la imagen"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions class="mt-5 d-flex flex-row-reverse">
              <div class="d-flex flex-row">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="$router.push(`/admin`)"
                >
                  Cancelar
                </v-btn>
                <v-btn color="primary" type="submit"> Editar Curso </v-btn>
              </div>
            </v-card-actions>
          </v-form>
        </v-container>
        <p class="text-end mr-5">*Todos los campos son requeridos</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
  beforeRouteEnter(to, from, next) {
    Firebase.firestore()
      .collection('cursos')
      .doc(to.params.id)
      .get()
      .then((document) => {
        next((vm) => {
          vm.course = { id: document.id, ...document.data() }
        })
      })
  },
  data: () => ({
    course: {},
    loading: false
  }),
  methods: {
    editCourse() {
      if (this.$refs.editForm.validate()) {
        this.loading = true
        Firebase.firestore()
          .collection('cursos')
          .doc(this.course.id)
          .update(this.course)
          .then(() => {
            this.loading = false
            this.$store.dispatch('coursesModule/getAllCourses')
            this.$router.push('/admin')
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style></style>
