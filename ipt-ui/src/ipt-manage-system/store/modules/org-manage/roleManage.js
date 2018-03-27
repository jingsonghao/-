import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleRoleManageTableDate = {
  state: {
    roleManageTableData: {}
  },
  getters: {
    roleManageTableData: state => state.roleManageTableData
  },
  actions: {
    getRoleManageTableData({commit}, params) {
      Api.RoleManage.getRoleManageTableData(params).then((roleManageTableData) => {
        commit(types.GET_ROLE_MANAGE_TABLE_DATE, {roleManageTableData})
      })
    }
  },
  mutations: {
    [types.GET_ROLE_MANAGE_TABLE_DATE](state, {roleManageTableData}) {
      state.roleManageTableData = roleManageTableData
    }
  }
}
export default {
  modules: {
    moduleRoleManageTableDate
  }
}
