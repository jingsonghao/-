import Api from '@/ipt-supervise-help/api'
import * as types from './../../mutation-types'

const moduleEmergencyHandleTableData = {
  state: {
    emergencyHandleList: {},
    generateReportUserList: []
  },
  getters: {
    emergencyHandleList: state => state.emergencyHandleList,
    generateReportUserList: state => state.generateReportUserList
  },
  actions: {
    getEmergencyHandleTableData({commit}, params) {
      Api.EmergencyHandle.findPage(params).then((emergencyHandleList) => {
        commit(types.GET_EMERGENCY_HANDLE_TABLE_DATA, {emergencyHandleList})
      })
    },
    selectedGenerateReportUserList({commit}, params) {
      commit(types.SELECTED_GENERATE_REPORT_USER_LIST, {params})
    }
  },
  mutations: {
    [types.GET_EMERGENCY_HANDLE_TABLE_DATA](state, {emergencyHandleList}) {
      state.emergencyHandleList = emergencyHandleList
    },
    [types.SELECTED_GENERATE_REPORT_USER_LIST](state, params) {
      state.generateReportUserList = params.params
    }
  }
}
export default {
  modules: {
    moduleEmergencyHandleTableData
  }
}
