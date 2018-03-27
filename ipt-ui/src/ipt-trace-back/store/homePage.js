import Api from '@/ipt-trace-back/api'
import * as types from './mutation-types'

const moduleTraceHomePageCountData = {
  state: {
    enterpriseRecordsNumCountData: {},
    traceDataAnalysisData: {},
    traceDataCountAnalysisData: {}
  },
  getters: {
    enterpriseRecordsNumCountData: state => state.enterpriseRecordsNumCountData,
    traceDataAnalysisData: state => state.traceDataAnalysisData,
    traceDataCountAnalysisData: state => state.traceDataCountAnalysisData
  },
  actions: {
    getEnterpriseRecordsNumCountData({commit}) {
      Api.HomePage.getEnterpriseRecordsStat().then((enterpriseRecordsNumCountData) => {
        commit(types.GET_ENTERPRISE_RECORDS_NUM_COUNT_DATA, {enterpriseRecordsNumCountData})
      })
    },
    getTraceDataAnalysisData({commit}) {
      Api.HomePage.traceDataAnalysisData().then((traceDataAnalysisData) => {
        commit(types.GET_TRACE_DATA_ANALYSIS_DATA, {traceDataAnalysisData})
      })
    },
    getTraceDataCountAnalysisData({commit}) {
      Api.HomePage.traceDataCountAnalysisData().then((traceDataCountAnalysisData) => {
        commit(types.GET_TRACE_DATA_COUNT_ANALYSIS_DATA, {traceDataCountAnalysisData})
      })
    }
  },
  mutations: {
    [types.GET_ENTERPRISE_RECORDS_NUM_COUNT_DATA](state, {enterpriseRecordsNumCountData}) {
      state.enterpriseRecordsNumCountData = enterpriseRecordsNumCountData.data
    },
    [types.GET_TRACE_DATA_ANALYSIS_DATA](state, {traceDataAnalysisData}) {
      state.traceDataAnalysisData = traceDataAnalysisData.data
    },
    [types.GET_TRACE_DATA_COUNT_ANALYSIS_DATA](state, {traceDataCountAnalysisData}) {
      state.traceDataCountAnalysisData = traceDataCountAnalysisData.data
    }
  }
}
export default {
  modules: {
    moduleTraceHomePageCountData
  }
}
