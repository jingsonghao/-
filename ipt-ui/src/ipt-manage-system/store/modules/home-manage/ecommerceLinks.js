import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleEcommerceLinksTableData = {
  state: {
    ecommerceLinksTableData: {}
  },
  getters: {
    ecommerceLinksTableData: state => state.ecommerceLinksTableData
  },
  actions: {
    getEcommerceLinksTableData({commit}, params) {
      Api.EcommerceLinks.getEcommerceLinksTableData(params).then((ecommerceLinksTableData) => {
        commit(types.GET_ECOMMERCE_LINKS_TABLE_DATA, {ecommerceLinksTableData})
      })
    }
  },
  mutations: {
    [types.GET_ECOMMERCE_LINKS_TABLE_DATA](state, {ecommerceLinksTableData}) {
      let pageList = ecommerceLinksTableData
      let pageData = {
        data: pageList.data,
        currentPage: pageList.currentPage,
        totalRecords: pageList.totalRecords,
        totalPages: pageList.totalPages
      }
      state.ecommerceLinksTableData = pageData
    }
  }
}
export default {
  modules: {
    moduleEcommerceLinksTableData
  }
}
