/**
 * Created by sqc on 2017/11/16.
 */
import Api from '@/ipt-trace-back/api'
import * as types from './../mutation-types'

const moduleRunningReportTableData = {
  state: {
    runningReportTableData: {}
  },
  getters: {
    runningReportTableData: state => state.runningReportTableData
  },
  actions: {
    getRunningReportTableData({commit}, params) {
      Api.RunningReport.getRunningReportTableData(params).then((runningReportTableData) => {
        commit(types.GET_RUNNING_REPORT_TABLE_DATA, {runningReportTableData})
      })
    }
  },
  mutations: {
    [types.GET_RUNNING_REPORT_TABLE_DATA](state, {runningReportTableData}) {
      state.runningReportTableData = runningReportTableData
    }
  }
}
export default {
  modules: {
    moduleRunningReportTableData
  }
}
