import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleCirNoDateInfoTableDate = {
  state: {
    cirNoDateInfoTableDate: {}
  },
  getters: {
    cirNoDateInfoTableDate: state => state.cirNoDateInfoTableDate
  },
  actions: {
    getCirNoDateInfoTableDate({commit}, params) {
      Api.CirNoDateInfo.getCirNoDateInfoTableDate(params).then(cirNoDateInfoTableDate => {
        commit(types.GET_CIRNODATE_INFO_TABLE_DATE, {cirNoDateInfoTableDate})
      })
    }
  },
  mutations: {
    [types.GET_CIRNODATE_INFO_TABLE_DATE](state, {cirNoDateInfoTableDate}) {
      console.log(cirNoDateInfoTableDate)
      state.cirNoDateInfoTableDate = cirNoDateInfoTableDate
    }
  }
}
export default {
  modules: {
    moduleCirNoDateInfoTableDate
  }
}
