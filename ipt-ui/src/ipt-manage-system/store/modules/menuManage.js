import Api from '@/ipt-manage-system/api'
import * as types from '../mutation-types'

const moduleMenuManageData = {
  state: {
    allMenus: {}
  },
  getters: {
    allMenus: state => state.allMenus
  },
  actions: {
    getAllMenus({commit}, params) {
      Api.MenuManage.getAllMenus(params).then((allMenus) => {
        commit(types.GET_ALL_MENUS, {allMenus})
      })
    }
  },
  mutations: {
    [types.GET_ALL_MENUS](state, {allMenus}) {
      state.allMenus = allMenus
    }
  }
}
export default {
  modules: {
    moduleMenuManageData
  }
}
