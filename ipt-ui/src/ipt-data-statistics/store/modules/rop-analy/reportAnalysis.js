import Api from '@/ipt-data-statistics/api'
import * as types from '../../mutation-types'

const moduleReportAnalysisTableData = {
  state: {
    reportAnalysisTableData: {}
  },
  getters: {
    reportAnalysisTableData: state => state.reportAnalysisTableData
  },
  actions: {
    getReportAnalysisTableData({commit}, params) {
      Api.ReportAnalysis.getReportAnalysisTableData(params).then(reportAnalysisTableData => {
        commit(types.GET_REPORT_ANALYSIS_TABLE_DATA, {reportAnalysisTableData})
      })
    }
  },
  mutations: {
    [types.GET_REPORT_ANALYSIS_TABLE_DATA](state, {reportAnalysisTableData}) {
      state.reportAnalysisTableData = reportAnalysisTableData
    }
  }
}
export default {
  modules: {
    moduleReportAnalysisTableData
  }
}
