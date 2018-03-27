import Vue from 'vue'
import Vuex from 'vuex'
import Common from "./modules/common"
import CityPlatform from "./modules/cityPlatform"
import CodingSystem from "@/ipt-coding-system/store"
import DataStatistics from "@/ipt-data-statistics/store"
import ManageSystem from "@/ipt-manage-system/store"
import SuperviseHelp from "@/ipt-supervise-help/store"
import TraceBack from "@/ipt-trace-back/store"
import EnumType from "./modules/enumType"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Common,
    CityPlatform,
    EnumType,
    CodingSystem,
    DataStatistics,
    ManageSystem,
    SuperviseHelp,
    TraceBack
  }
})
