/**
 * @描述: 工作考核管理  --> 综合性考核
 * @作者: Guo Ze Qiang
 * @日期: 2017/12/14
 * @时间: 13:12
 */
import Api from '@/ipt-supervise-help/api'
import * as types from './../../mutation-types'

const moduleTotalExamine = {
  state: {
    totalExamine: {}  //综合性考核
  },
  getters: {
    totalExamine: state => state.totalExamine  //综合性考核

  },
  actions: {
    getTotalExamine({commit}, params) {
      Api.TotalExamine.getTotalExamine(params).then((totalExamine) => {  //综合性考核
        commit(types.GET_TOTAL_EXAMINE, {totalExamine})
      })
    }
  },
  mutations: {
    [types.GET_TOTAL_EXAMINE](state, {totalExamine}) { //综合性考核
      state.totalExamine = totalExamine
    }
  }
}
export default {
  modules: {
    moduleTotalExamine
  }
}
