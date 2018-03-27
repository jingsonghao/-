
import Api from '@/ipt-trace-back/api'
import * as types from '../mutation-types'

const moduleDeleteRecoverTableData = {
  state: {
    deleteRecoverTableData: {}
  },
  getters: {
    deleteRecoverTableData: state => state.deleteRecoverTableData
  },
  actions: {
    getDeleteRecoverTableData({commit}, params) {
      Api.DeleteRecover.findPage(params).then(deleteRecoverTableData => {
        commit(types.GET_DELETE_RECOVER_TABLE_DATA, {deleteRecoverTableData})
      })
    }
  },
  mutations: {
    [types.GET_DELETE_RECOVER_TABLE_DATA](state, {deleteRecoverTableData}) {
      state.deleteRecoverTableData = deleteRecoverTableData
    }
  }
}
export default {
  modules: {
    moduleDeleteRecoverTableData
  }
}
