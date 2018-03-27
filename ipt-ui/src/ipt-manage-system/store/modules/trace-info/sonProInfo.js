import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleSonProInfoTableDate = {
  state: {
   sonProInfoTableDate: {}
  },
  getters: {
   sonProInfoTableDate: state => state.sonProInfoTableDate
  },
  actions: {
    getSonProInfoTableDate({commit}, params) {
      Api.SonProInfo.getSonProInfoTableDate({params: params}, sonProInfoTableDate => {
        commit(types.GET_SON_INFO_TABLE_DATE, {sonProInfoTableDate})
      })
    }
  },
  mutations: {
    [types.GET_SON_INFO_TABLE_DATE](state, {sonProInfoTableDate}) {
      state.sonProInfoTableDate = sonProInfoTableDate
    }
  }
}
export default {
  modules: {
    moduleSonProInfoTableDate
  }
}
