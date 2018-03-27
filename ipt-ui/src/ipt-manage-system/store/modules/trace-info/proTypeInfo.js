import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleProTypeInfoTableDate = {
  state: {
    proTypeInfoTableDate: {}
  },
  getters: {
    proTypeInfoTableDate: state => state.proTypeInfoTableDate
  },
  actions: {
    getProTypeInfoTableDate({commit}, params) {
      Api.ProTypeInfo.getProTypeInfoTableDate(params).then((proTypeInfoTableDate) => {
        commit(types.GET_PRO_INFO_TABLE_DATE, {proTypeInfoTableDate})
      })
    }
  },
  mutations: {
    [types.GET_PRO_INFO_TABLE_DATE](state, {proTypeInfoTableDate}) {
      state.proTypeInfoTableDate = proTypeInfoTableDate
    }
  }
}
export default {
  modules: {
    moduleProTypeInfoTableDate
  }
}
