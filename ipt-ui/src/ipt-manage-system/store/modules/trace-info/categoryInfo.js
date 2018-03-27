import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleCategoryInfoTableData = {
  state: {
    categoryInfoTableData: {}
  },
  getters: {
    categoryInfoTableData: state => state.categoryInfoTableData
  },
  actions: {
    getCategoryInfoTableData({commit}, params) {
      Api.CategoryInfo.getCategoryInfoTableData({params: params}).then(categoryInfoTableData => {
        commit(types.GET_CATEGORY_RANK_TABLE_DATA, {categoryInfoTableData})
      })
    }
  },
  mutations: {
    [types.GET_CATEGORY_RANK_TABLE_DATA](state, {categoryInfoTableData}) {
      state.categoryInfoTableData = categoryInfoTableData
    }
  }
}
export default {
  modules: {
    moduleCategoryInfoTableData
  }
}
