import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleSonCatInfoTableDate = {
  state: {
    sonCatInfoTableDate: {}
  },
  getters: {
    sonCatInfoTableDate: state => state.sonCatInfoTableDate
  },
  actions: {
    getSonCatInfoTableDate({commit}, params) {
      Api.SonCatInfo.getSonCatInfoTableDate({params: params}).then(sonCatInfoTableDate => {
        commit(types.GET_SCAT_INFO_TABLE_DATE, {sonCatInfoTableDate})
      })
    }
  },
  mutations: {
    [types.GET_SCAT_INFO_TABLE_DATE](state, {sonCatInfoTableDate}) {
      state.sonCatInfoTableDate = sonCatInfoTableDate
    }
  }
}
export default {
  modules: {
    moduleSonCatInfoTableDate
  }
}
