import Api from '@/ipt-supervise-help/api'
import * as types from './../../mutation-types'

const moduleEmergencyPlanTableData = {
  state: {
    emergencyPlanTableData: {}
  },
  getters: {
    emergencyPlanTableData: state => state.emergencyPlanTableData
  },
  actions: {
    getEmergencyPlanTableData({commit}, params) {
      Api.EmergencyPlan.findPage(params).then((emergencyPlanTableData) => {
        commit(types.GET_EMERGENCY_PLAN_TABLE_DATA, {emergencyPlanTableData})
      })
    }
  },
  mutations: {
    [types.GET_EMERGENCY_PLAN_TABLE_DATA](state, {emergencyPlanTableData}) {
      state.emergencyPlanTableData = emergencyPlanTableData
    }
  }
}
export default {
  modules: {
    moduleEmergencyPlanTableData
  }
}
