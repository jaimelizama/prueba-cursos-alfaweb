<template>
  <div class="container course-admin">
    <v-container>
      <h4>Panel de Administración de Cursos</h4>
      <v-row class="ml-1 mt-5">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="addCourseButton"
            >
              Agregar Curso
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Agregar Curso</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" @submit.prevent="addCourse">
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formCourse.codigo"
                        label="Código"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="9">
                      <v-text-field
                        v-model="formCourse.nombre"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formCourse.descripcion"
                        label="Descripción"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="formCourse.costo"
                        type="number"
                        min="0"
                        max="1000000"
                        step="10000"
                        label="Costo"
                        required
                        prefix="$"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="formCourse.cupos"
                        type="number"
                        min="0"
                        label="Cupos"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="formCourse.inscritos"
                        type="number"
                        min="0"
                        label="Inscritos"
                        required
                        hint="La cantidad de Inscritos no puede ser mayor a los cupos disponibles"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="formCourse.fecha"
                        label="Fecha"
                        required
                        hint="formato dd/mm/aaaa"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="formCourse.duracion"
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
                        v-model="formCourse.estado"
                        label="Terminado"
                        required
                      ></v-switch>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formCourse.imagen"
                        label="Imagen"
                        required
                        hint="Pega la URL de la imagen"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-actions class="mt-5 d-flex flex-row-reverse">
                    <div class="d-flex flex-row">
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancelar
                      </v-btn>
                      <v-btn
                        :disabled="!isComplete"
                        color="primary"
                        type="submit"
                        @click="dialog = false"
                      >
                        Agregar Curso
                      </v-btn>
                    </div>
                  </v-card-actions>
                </v-form>
              </v-container>
              <p class="text-end mr-5">*Todos los campos son requeridos</p>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AddCourse',
  data: () => ({
    dialog: false,
    formCourse: {
      codigo: '',
      nombre: '',
      descripcion: '',
      costo: 0,
      cupos: 0,
      inscritos: 0,
      duracion: '',
      estado: false,
      imagen: '',
      fecha: new Date().toISOString().slice(0, 10)
    }
  }),
  methods: {
    mounted() {
      this.$store.dispatch('coursesModule/getAllCourses')
    },
    addCourseButton() {
      console.log('click on add course button')
    },
    async addCourse() {
      console.log('click on add course')
      console.log(this.formCourse)
      await this.$swal({
        title: '¿Estas seguro de querer agregar este curso?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#00C853',
        cancelButtonColor: '#546E7A',
        confirmButtonText: 'Sí, Agregar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('coursesModule/addCourse', this.formCourse)
          this.$store.dispatch('coursesModule/getAllCourses')
          this.formCourse.codigo = ''
          this.formCourse.nombre = ''
          this.formCourse.descripcion = ''
          this.formCourse.costo = 0
          this.formCourse.cupos = 0
          this.formCourse.inscritos = 0
          this.formCourse.duracion = ''
          this.formCourse.estado = false
          this.formCourse.imagen = ''
          this.formCourse.fecha = new Date().toISOString().slice(0, 10)
          this.$swal.fire('Curso Agregado', '', 'success')
        }
      })
    }
  },
  computed: {
    isComplete() {
      return (
        this.formCourse.codigo != '' &&
        this.formCourse.nombre != '' &&
        this.formCourse.descripcion != '' &&
        this.formCourse.duracion != '' &&
        this.formCourse.imagen != '' &&
        this.formCourse.fecha != '' &&
        parseInt(this.formCourse.inscritos) <= parseInt(this.formCourse.cupos)
      )
    }
  }
}
</script>

<style scoped>
p {
  font-size: 12px;
}
.course-admin {
  margin-top: 100px;
}
</style>
