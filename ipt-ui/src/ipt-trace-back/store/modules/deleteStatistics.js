import Api from '@/ipt-trace-back/api'
import * as types from '../mutation-types'

const moduleDeleteStatisticsTableData = {
  state: {
    deleteStatisticsTableData: {}
  },
  getters: {
    deleteStatisticsTableData: state => state.deleteStatisticsTableData
  },
  actions: {
    getDeleteStatisticsTableData({commit}, params) {
      Api.DeleteStatistics.getDeleteStatisticsTableData(params).then((deleteStatisticsTableData) => {
        commit(types.GET_DELETE_STATISTICS_TABLE_DATA, {deleteStatisticsTableData})
      })
    }
  },
  mutations: {
    [types.GET_DELETE_STATISTICS_TABLE_DATA](state, {deleteStatisticsTableData}) {
      state.deleteStatisticsTableData = deleteStatisticsTableData
    }
  }
}
export default {
  modules: {
    moduleDeleteStatisticsTableData
  }
}
