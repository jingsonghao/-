import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleBackEnterpriseTableData = {
  state: {
    backEnterpriseTableData: {}
  },
  getters: {
    backEnterpriseTableData: state => state.backEnterpriseTableData
  },
  actions: {
    getBackEnterpriseTableData({commit}, params) {
      Api.BackEnterprise.getBackEnterpriseTableData(params).then((backEnterpriseTableData) => {
        commit(types.GET_BACK_ENTERPRISE_TABLE_DATA, {backEnterpriseTableData})
      })
    }
  },
  mutations: {
    [types.GET_BACK_ENTERPRISE_TABLE_DATA](state, {backEnterpriseTableData}) {
      console.log("++++++++++++++++++++++++++++++++++++++++")
      console.log(backEnterpriseTableData)
      console.log("++++++++++++++++++++++++++++++++++++++++")
      let pageList1 = backEnterpriseTableData.data.pageList
      let enterpriseTypeEnum = backEnterpriseTableData.data.enterpriseTypeEnum
      let pageData = {
        data: pageList1.content,
        currentPage: pageList1.number + 1,
        totalRecords: pageList1.totalElements,
        totalPages: pageList1.totalPages,
        enterpriseTypeEnum: enterpriseTypeEnum
      }
      console.log(pageData)
      state.backEnterpriseTableData = pageData
    }
  }
}
export default {
  modules: {
    moduleBackEnterpriseTableData
  }
}
