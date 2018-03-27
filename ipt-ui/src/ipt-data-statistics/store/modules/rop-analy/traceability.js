import Api from '@/ipt-data-statistics/api'
import * as types from '../../mutation-types'

const moduleTraceabilityTableData = {
  state: {
    traceabilityTableData: {}
  },
  getters: {
    traceabilityTableData: state => state.traceabilityTableData
  },
  actions: {
    getTraceabilityTableData({commit}, params) {
      Api.Traceability.getTraceabilityTableData(params).then(traceabilityTableData => {
        commit(types.GET_TRACEABILITY_TABLE_DATA, {traceabilityTableData})
      })
    }
  },
  mutations: {
    [types.GET_TRACEABILITY_TABLE_DATA](state, {traceabilityTableData}) {
      state.traceabilityTableData = traceabilityTableData
    }
  }
}
export default {
  modules: {
    moduleTraceabilityTableData
  }
}
