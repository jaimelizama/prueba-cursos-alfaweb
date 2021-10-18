<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="(course, id) in $store.state.coursesModule.courses"
        :key="id"
        ><v-hover v-slot="{ hover }" open-delay="0">
          <v-card
            class="justify-space-around my-5"
            :class="{ 'on-hover': hover }"
            max-width="500"
            :elevation="hover ? 20 : 4"
          >
            <v-row justify="center" class="p-5">
              <v-img
                contain
                :src="course.imagen"
                max-height="200"
                max-width="200"
              >
              </v-img>
            </v-row>
            <v-card-text class="grey lighten-2">
              <v-card-title class="font-weight-bold">{{
                course.nombre
              }}</v-card-title>
              <v-card-text class="mt-5">Información</v-card-text>
              <v-timeline align-top dense>
                <v-timeline-item color="purple" small>
                  <div>
                    <div class="font-weight-normal">
                      Costo:
                      <strong
                        >${{ course.costo.toLocaleString('de-DE') }}</strong
                      ><br />
                      Duración: {{ course.duracion }}
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="success" small>
                  <div>
                    <div class="font-weight-normal">
                      Cupos:
                      <strong>{{ course.cupos }}</strong
                      ><br />
                      Completado: {{ course.estado ? 'Si' : 'No' }}
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="purple" small>
                  <div>
                    <div class="font-weight-normal">
                      Fecha de Registro:
                      <br />
                      {{ course.fecha }}
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item color="success" small>
                  <div>
                    <div class="font-weight-normal">
                      Descripción:
                      <br />
                      {{ course.descripcion }}
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CoursesCard',
  mounted() {
    this.$store.dispatch('coursesModule/getAllCourses')
  }
}
</script>

<style></style>
