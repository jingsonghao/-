import Api from '@/api'
import * as types from '../mutation-types'

const moduleCityPlatformTableData = {
  state: {
    enterpriseCountData: {},
    equipmentRunStatusData: {},
    lastQuarterTraceDataAnalysisData: {},
    workExamineAnalysisData: {},
    todayStatData: {},
    nodeTypeExamineAnalysisData: {}
  },
  getters: {
    enterpriseCountData: state => state.enterpriseCountData,
    equipmentRunStatusData: state => state.equipmentRunStatusData,
    lastQuarterTraceDataAnalysisData: state => state.lastQuarterTraceDataAnalysisData,
    workExamineAnalysisData: state => state.workExamineAnalysisData,
    todayStatData: state => state.todayStatData,
    nodeTypeExamineAnalysisData: state => state.nodeTypeExamineAnalysisData
  },
  actions: {
    getEnterpriseCountData({commit}) {
      Api.CityPlatform.enterpriseCount().then((enterpriseCountData) => {
        commit(types.GET_ENTERPRISE_COUNT_DATA, {enterpriseCountData})
      })
    },
    getEquipmentRunStatusData({commit}) {
      Api.CityPlatform.equipmentRunStatus().then((equipmentRunStatusData) => {
        commit(types.GET_EQUIPMENT_RUN_STATUS_DATA, {equipmentRunStatusData})
      })
    },
    getLastQuarterTraceDataAnalysisData({commit}) {
      Api.CityPlatform.getTraceDataAnalysisData().then((lastQuarterTraceDataAnalysisData) => {
        commit(types.GET_LAST_QUARTER_TRACE_DATA_ANALYSIS_DATA, {lastQuarterTraceDataAnalysisData})
      })
    },
    getWorkExamineAnalysisData({commit}) {
      Api.CityPlatform.getLastMonthWorkAnalysis().then((workExamineAnalysisData) => {
        commit(types.GET_WORK_EXAMINE_ANALYSIS_DATA, {workExamineAnalysisData})
      })
    },
    getTodayStatData({commit}) {
      Api.CityPlatform.getTodayStat().then((todayStatData) => {
        commit(types.GET_TODAY_STAT_DATA, {todayStatData})
      })
    },
    getNodeTypeExamineAnalysisData({commit}) {
      Api.CityPlatform.getNodeTypeExamineAnalysisList().then((nodeTypeExamineAnalysisData) => {
        commit(types.GET_NODE_TYPE_EXAMINE_ANALYSIS_DATA, {nodeTypeExamineAnalysisData})
      })
    }
  },
  mutations: {
    [types.GET_ENTERPRISE_COUNT_DATA](state, {enterpriseCountData}) {
      state.enterpriseCountData = enterpriseCountData.data
    },
    [types.GET_EQUIPMENT_RUN_STATUS_DATA](state, {equipmentRunStatusData}) {
      state.equipmentRunStatusData = equipmentRunStatusData.data
    },
    [types.GET_LAST_QUARTER_TRACE_DATA_ANALYSIS_DATA](state, {lastQuarterTraceDataAnalysisData}) {
      state.lastQuarterTraceDataAnalysisData = lastQuarterTraceDataAnalysisData.data
    },
    [types.GET_WORK_EXAMINE_ANALYSIS_DATA](state, {workExamineAnalysisData}) {
      state.workExamineAnalysisData = workExamineAnalysisData.data
    },
    [types.GET_TODAY_STAT_DATA](state, {todayStatData}) {
      state.todayStatData = todayStatData.data
    },
    [types.GET_NODE_TYPE_EXAMINE_ANALYSIS_DATA](state, {nodeTypeExamineAnalysisData}) {
      state.nodeTypeExamineAnalysisData = nodeTypeExamineAnalysisData.data
    }
  }
}
export default {
  modules: {
    moduleCityPlatformTableData
  }
}
