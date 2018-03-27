import Api from '@/ipt-supervise-help/api'
import * as types from './../../mutation-types'

const moduleEmergencyCityHandleTableData = {
  state: {
    emergencyCityHandleList: {},
    cityGenerateReportUserList: []
  },
  getters: {
    emergencyCityHandleList: state => state.emergencyCityHandleList,
    cityGenerateReportUserList: state => state.cityGenerateReportUserList
  },
  actions: {
    getEmergencyCityHandleTableData({commit}, params) {
      Api.EmergencyCityHandle.findPage(params).then((emergencyCityHandleList) => {
        commit(types.GET_EMERGENCY_CITY_HANDLE_TABLE_DATA, {emergencyCityHandleList})
      })
    },
    selectedCityGenerateReportUserList({commit}, params) {
      commit(types.SELECTED_CITY_GENERATE_REPORT_USER_LIST, {params})
    }
  },
  mutations: {
    [types.GET_EMERGENCY_CITY_HANDLE_TABLE_DATA](state, {emergencyCityHandleList}) {
      state.emergencyCityHandleList = emergencyCityHandleList
    },
    [types.SELECTED_CITY_GENERATE_REPORT_USER_LIST](state, params) {
      state.cityGenerateReportUserList = params.params
    }
  }
}
export default {
  modules: {
    moduleEmergencyCityHandleTableData
  }
}
