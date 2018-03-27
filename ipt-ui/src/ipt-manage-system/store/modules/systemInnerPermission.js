import Api from '@/ipt-manage-system/api'
import * as types from '../mutation-types'

const moduleSystemInnerPermissionTableData = {
  state: {
    systemInnerPermissionTableData: {}
  },
  getters: {
    systemInnerPermissionTableData: state => state.systemInnerPermissionTableData
  },
  actions: {
    getSystemInnerPermissionTableData({commit}, params) {
      Api.SystemInnerPermission.getSystemInnerPermissionTableData(params).then((systemInnerPermissionTableData) => {
        commit(types.GET_SYSTEM_INNER_PERMISSION_TABLE_DATA, {systemInnerPermissionTableData})
      })
    }
  },
  mutations: {
    [types.GET_SYSTEM_INNER_PERMISSION_TABLE_DATA](state, {systemInnerPermissionTableData}) {
      state.systemInnerPermissionTableData = systemInnerPermissionTableData
    }
  }
}
export default {
  modules: {
    moduleSystemInnerPermissionTableData
  }
}
