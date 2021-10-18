import Firebase from 'firebase'

export const coursesModule = {
  namespaced: true,
  state: {
    courses: [],
    course: null
  },
  getters: {
    totalNumberOfStudentsAllowed(state) {
      return state.courses.reduce((accumulator, course) => {
        accumulator += Number.parseInt(course.cupos)
        return accumulator
      }, 0)
    },
    totalNumberOfEnrolledStudents(state) {
      return state.courses.reduce((accumulator, course) => {
        accumulator += Number.parseInt(course.inscritos)
        return accumulator
      }, 0)
    },

    totalNumberOfSeatsRemaining(state) {
      return state.courses.reduce((accumulator, course) => {
        accumulator +=
          Number.parseInt(course.cupos) - Number.parseInt(course.inscritos)
        return accumulator
      }, 0)
    },
    totalNumberOfCoursesCompleted(state) {
      return state.courses.filter((course) => course.estado).length
    },
    totalNumberOfActiveCourses(state) {
      return state.courses.filter((course) => !course.estado).length
    }
  },
  mutations: {
    SET_COURSES(state, newCourse) {
      state.courses = newCourse
    },
    ADD_COURSE_TO_COURSES(state, newCourse) {
      state.courses.push(newCourse)
    },
    DELETE_COURSE(state, course) {
      state.courses.splice(course, 1)
    }
  },
  actions: {
    getAllCourses(context) {
      Firebase.firestore()
        .collection('cursos')
        .get()
        .then((collection) => {
          //variable auxiliar
          const courses = []
          // colección
          collection.forEach((document) => {
            courses.push({ id: document.id, ...document.data() })
          })
          // guardar en state
          context.commit('SET_COURSES', courses)
        })
    },
    addCourse(context, newCourse) {
      Firebase.firestore()
        .collection('cursos')
        .add({
          ...newCourse
        })
        .then(() => {
          console.log('Document successfully written!')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
      context.commit('ADD_COURSE_TO_COURSES', newCourse)
    },
    deleteCourse(context, course) {
      Firebase.firestore()
        .collection('cursos')
        .doc(course)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error removing document: ', error)
        })
      context.commit('DELETE_COURSE', course)
    }
  }
}
