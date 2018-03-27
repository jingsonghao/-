import Api from '@/ipt-trace-back/api'
import * as types from '../mutation-types'

const moduleAdminRecordTableData = {
  state: {
    adminRecordTableData: {}
  },
  getters: {
    adminRecordTableData: state => state.adminRecordTableData
  },
  actions: {
    getAdminRecordTableData({commit}, params) {
      Api.AdminRecord.findPage(params).then((adminRecordTableData) => {
        commit(types.GET_ADMIN_RECORD_TABLE_DATA, {adminRecordTableData})
      })
    }
  },
  mutations: {
    [types.GET_ADMIN_RECORD_TABLE_DATA](state, {adminRecordTableData}) {
      state.adminRecordTableData = adminRecordTableData
    }
  }
}
export default {
  modules: {
    moduleAdminRecordTableData
  }
}
