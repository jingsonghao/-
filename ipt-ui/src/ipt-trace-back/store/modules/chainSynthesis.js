/**
 * @描述: 追溯链条合成
 * @作者: Guo Ze Qiang
 * @日期: 2017/11/23
 * @时间: 10:03
 */
import Api from '@/ipt-trace-back/api'
import * as types from '../mutation-types'

const moduleChainSynthesisTableData = {
  state: {
    chainSynthesisTableData: {}
  },
  getters: {
    chainSynthesisTableData: state => state.chainSynthesisTableData
  },
  actions: {
    getChainSynthesisTableData({commit}, params) {
      Api.ChainSynthesis.getChainSynthesisTableData(params).then(chainSynthesisTableData => {
        commit(types.GET_CHAIN_SYNTHESIS_TABLE_DATA, {chainSynthesisTableData})
      })
    }
  },
  mutations: {
    [types.GET_CHAIN_SYNTHESIS_TABLE_DATA](state, {chainSynthesisTableData}) {
      state.chainSynthesisTableData = chainSynthesisTableData
    }
  }
}
export default {
  modules: {
    moduleChainSynthesisTableData
  }
}
