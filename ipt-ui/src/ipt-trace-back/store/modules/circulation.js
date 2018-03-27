import Api from '@/ipt-trace-back/api'
import * as types from '../mutation-types'

// initial state
const modulePlaceOriginBreedTableData = {
  state: {
    dataTypes: {}
    , pageData: {}
  },

// getters
  getters: {
    dataTypes: state => state.dataTypes
    , pageData: state => state.pageData
  },

// actions
  actions: {
    getDataTypes ({commit}, params) {
      /** yanggang 2018/2/1 将环节信息安装节点类型分类 */
      Api.Circulation.getDataTypes(params).then(dataTypes => {
        commit(types.GET_DATA_TYPES, {dataTypes})
      })
    }
    , getPageData ({commit}, params) {
      Api.Circulation.getPageData(params.id, params).then(pageData => {
        commit(types.GET_PAGE_DATA, {pageData})
      })
    }
  },

// mutations
  mutations: {
    [types.GET_DATA_TYPES] (state, {dataTypes}) {
      state.dataTypes = dataTypes
    }
    , [types.GET_PAGE_DATA] (state, {pageData}) {
      state.pageData = pageData
    }
  }
}

export default {
  modules: {
    modulePlaceOriginBreedTableData
  }
}
