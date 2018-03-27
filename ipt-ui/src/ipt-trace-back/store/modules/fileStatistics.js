import Api from '@/ipt-trace-back/api'
import * as types from '../mutation-types'

const moduleFileStatisticsData = {
  state: {
    fileStatisticsData: {},
    enterpriseInfoTableData: {}
  },
  getters: {
    fileStatisticsData: state => state.fileStatisticsData,
    enterpriseInfoTableData: state => state.enterpriseInfoTableData
  },
  actions: {
    getFileStatisticsData({commit}, params) {
      Api.FileStatistics.getFileStatisticsData(params).then((fileStatisticsData) => {
        commit(types.GET_FILE_STATISTICS_DATA, {fileStatisticsData})
      })
    },
    getEnterpriseInfoTableData({commit}, params) {
      Api.FileStatistics.getEnterpriseInfoTableData(params).then((enterpriseInfoTableData) => {
        commit(types.GET_ENTERPRISE_INFO_TABLE_DATA, {enterpriseInfoTableData})
      })
    }
  },
  mutations: {
    [types.GET_FILE_STATISTICS_DATA](state, {fileStatisticsData}) {
      state.fileStatisticsData = fileStatisticsData
    },
    [types.GET_ENTERPRISE_INFO_TABLE_DATA](state, {enterpriseInfoTableData}) {
      state.enterpriseInfoTableData = enterpriseInfoTableData
    }
  }
}
export default {
  modules: {
    moduleFileStatisticsData
  }
}
