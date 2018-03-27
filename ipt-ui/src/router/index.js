import Vue from "vue"
import Router from "vue-router"
import CityPlatform from "@/pages/cityPlatform"
import CodingSystem from "@/ipt-coding-system/router"
import DataStatistics from "@/ipt-data-statistics/router"
import ManageSystem from "@/ipt-manage-system/router"
import SuperviseHelp from "@/ipt-supervise-help/router"
import TraceBack from "@/ipt-trace-back/router"

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/cityPlatform'
  },
  {
    path: '/cityPlatform',
    component: CityPlatform
  },
  ...CodingSystem,
  ...DataStatistics,
  ...ManageSystem,
  ...SuperviseHelp,
  ...TraceBack
]

const router = new Router({
  base: '/ipt',
  mode: 'history',
  routes
})

export default router
