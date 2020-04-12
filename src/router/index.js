import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../components/Test.md'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '', redirect: 'test' },
      { path: 'test', component: Test }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
