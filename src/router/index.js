import Vue from 'vue'
import VueRouter from 'vue-router'
import Firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/UserLogIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/UserSignUp.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/admin',
    name: 'Administracion',
    component: () =>
      import(/* webpackChunkName: "admin" */ '../views/CoursesAdministration'),
    meta: {
      login: true
    }
  },
  {
    path: '/course-edit/:id',
    name: 'CourseEdit',
    component: () =>
      import(/* webpackChunkName: "course-edit" */ '../views/CourseEdit'),
    meta: {
      login: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login) {
    const user = Firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next('login')
    }
  } else {
    next()
  }
})

export default router
