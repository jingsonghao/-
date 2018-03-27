import Api from '@/ipt-supervise-help/api'
import * as types from './../../mutation-types'

const moduleEmergencyRecordTableData = {
  state: {
    emergencyCityRecordList: {}
  },
  getters: {
    emergencyCityRecordList: state => state.emergencyCityRecordList
  },
  actions: {
    getEmergencyCityRecordTableData({commit}, params) {
      Api.EmergencyCityHandle.findPage(params).then((emergencyCityRecordList) => {
        commit(types.GET_EMERGENCY_CITY_RECORD_TABLE_DATA, {emergencyCityRecordList})
      })
    }
  },
  mutations: {
    [types.GET_EMERGENCY_CITY_RECORD_TABLE_DATA](state, {emergencyCityRecordList}) {
      state.emergencyCityRecordList = emergencyCityRecordList
    }
  }
}
export default {
  modules: {
    moduleEmergencyRecordTableData
  }
}
