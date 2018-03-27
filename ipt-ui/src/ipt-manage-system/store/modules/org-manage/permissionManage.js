import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const modulePermissionManageTableData = {
  state: {
    permissionManageTableData: {}
  },
  getters: {
    permissionManageTableData: state => state.permissionManageTableData
  },
  actions: {
    getPermissionManageTableData({commit}, params) {
      Api.PermissionManage.getPermissionManageTableData(params).then((permissionManageTableData) => {
        commit(types.GET_PERMISSION_MANAGE_TABLE_DATA, {permissionManageTableData})
      })
    }
  },
  mutations: {
    [types.GET_PERMISSION_MANAGE_TABLE_DATA](state, {permissionManageTableData}) {
      state.permissionManageTableData = permissionManageTableData
    }
  }
}
export default {
  modules: {
    modulePermissionManageTableData
  }
}
