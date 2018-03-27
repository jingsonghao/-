/**
 * Created by sqc on 2017/11/16.
 */
import Api from '@/ipt-supervise-help/api'
import * as types from './../mutation-types'

const moduleEarlyWarningTableData = {
  state: {
    earlyWarningTableData: {}
  },
  getters: {
    earlyWarningTableData: state => state.earlyWarningTableData
  },
  actions: {
    getEarlyWarningTableData({commit}, params) {
      Api.EarlyWaring1.getEarlyWarningTableData(params).then(earlyWarningTableData => {
        commit(types.GET_EARLY_WARNING_TABLE_DATA, {earlyWarningTableData})
      })
    }
  },
  mutations: {
    [types.GET_EARLY_WARNING_TABLE_DATA](state, {earlyWarningTableData}) {
      state.earlyWarningTableData = earlyWarningTableData
    }
  }
}
export default {
  modules: {
    moduleEarlyWarningTableData
  }
}
