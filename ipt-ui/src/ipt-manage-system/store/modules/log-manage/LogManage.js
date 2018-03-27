import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleLogManageTableDate = {
  state: {
    userOptLogTableData: {},
    systemRunLogTableData: {}
  },
  getters: {
    userOptLogTableData: state => state.userOptLogTableData,
    systemRunLogTableData: state => state.systemRunLogTableData
  },
  actions: {
    getUserOptLogTableData({commit}, params) {
      Api.LogManage.getUserOptLogTableData(params).then((userOptLogTableData) => {
        commit(types.GET_USER_OPT_LOG_TABLE_DATA, {userOptLogTableData})
      })
    },
    getSystemRunLogTableData({commit}, params) {
      Api.LogManage.getSystemRunLogTableData(params).then((systemRunLogTableData) => {
        commit(types.GET_SYSTEM_RUN_LOG_TABLE_DATA, {systemRunLogTableData})
      })
    }
  },
  mutations: {
    [types.GET_USER_OPT_LOG_TABLE_DATA](state, {userOptLogTableData}) {
      state.userOptLogTableData = userOptLogTableData
    },
    [types.GET_SYSTEM_RUN_LOG_TABLE_DATA](state, {systemRunLogTableData}) {
      state.systemRunLogTableData = systemRunLogTableData
    }
  }
}
export default {
  modules: {
    moduleLogManageTableDate
  }
}
