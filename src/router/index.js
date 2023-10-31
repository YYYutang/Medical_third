import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import dataManage from "@/views/dataManage/index.vue";
import logIn from "@/views/User/login.vue"
import featureExtract from '@/views/featureExtract/index.vue'
import multiefeature from "@/views/MultiefeatureExtract/index.vue"
import introduce from "@/views/introduce/intoduce.vue"
import register from "@/views/User/register.vue"
import columnManage from "@/views/columnManage/columnManage.vue"
import operationManage from "@/views/operationManage/operationManage.vue"
Vue.use(VueRouter)

const routes = [
  
    {
      path: '/',
      name: 'logIn',
      component: logIn
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
    path: '/first',
    redirect:'/introduce',
    name: 'first',
    component: SideBar,
    children: [{
      path: '/dash',
      name: 'dash',
      component: dash
    },
    {
      path: '/featureExtract',
      name: 'featureExtract',
      component: featureExtract,
    },
    {
      path: '/operationManage',
      name: 'operationManage',
      component: operationManage,
    },

    {
      path: '/dataManage',
      name: 'dataManage',
      component: dataManage,
    },
    {
      path: '/columnManage',
      name: 'columnManage',
      component: columnManage,
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: introduce,
    },
    {
      path:'/multiefeature',
      name:'multiefeature',
      component:multiefeature,
    }

    ]
  },

]

const router = new VueRouter({
  routes
})
export default router
