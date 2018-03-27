import Api from '@/ipt-supervise-help/api'
import * as types from './../../mutation-types'

const moduleEmergencyRecordTableData = {
  state: {
    emergencyRecordList: {}
  },
  getters: {
    emergencyRecordList: state => state.emergencyRecordList
  },
  actions: {
    getEmergencyRecordTableData({commit}, params) {
      Api.EmergencyHandle.findPage(params).then((emergencyRecordList) => {
        commit(types.GET_EMERGENCY_RECORD_TABLE_DATA, {emergencyRecordList})
      })
    }
  },
  mutations: {
    [types.GET_EMERGENCY_RECORD_TABLE_DATA](state, {emergencyRecordList}) {
      state.emergencyRecordList = emergencyRecordList
    }
  }
}
export default {
  modules: {
    moduleEmergencyRecordTableData
  }
}
