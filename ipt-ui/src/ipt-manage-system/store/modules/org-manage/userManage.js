import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleUserManageTableData = {
  state: {
    userManageTableData: {}
  },
  getters: {
    userManageTableData: state => state.userManageTableData
  },
  actions: {
    getUserManageTableData({commit}, params) {
      Api.UserManage.getUserManageTableData(params).then((userManageTableData) => {
        commit(types.GET_USER_MANAGE_TABLE_DATA, {userManageTableData})
      })
    }
  },
  mutations: {
    [types.GET_USER_MANAGE_TABLE_DATA](state, {userManageTableData}) {
      state.userManageTableData = userManageTableData
    }
  }
}
export default {
  modules: {
    moduleUserManageTableData
  }
}
