import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import index2 from '../components/index2.vue'
import user from '../components/user.vue'
import main1 from '../components/main1.vue'
import data_manage from '../components/data_manage.vue'
import {
  Main
} from 'element-ui'

Vue.use(VueRouter)

const routes = [

  
  {
    path: '/',
    name: 'root',
    redirect: "/Login"
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/index2',
    name: 'index2',
    component: index2,
    children: [{
        path: 'user',
        component: user
      },
      {
        path: 'main1',
        component: main1
      },
      {
        path: 'data_manage',
        component: data_manage
      },
    ]

  }
]

const router = new VueRouter({

  routes
})

export default router