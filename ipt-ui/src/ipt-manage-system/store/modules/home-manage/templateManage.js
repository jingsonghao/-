import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleTemplateManageTableData = {
  state: {
    templateManageTableData: {}
  },
  getters: {
    templateManageTableData: state => state.templateManageTableData
  },
  actions: {
    getTemplateManageTableData({commit}, params) {
      Api.TemplateManage.findPage(params).then((templateManageTableData) => {
        commit(types.GET_TEMPLATE_MANAGE_TABLE_DATA, {templateManageTableData})
      })
    }
  },
  mutations: {
    [types.GET_TEMPLATE_MANAGE_TABLE_DATA](state, {templateManageTableData}) {
      state.templateManageTableData = templateManageTableData
    }
  }
}

export default {
  modules: {
    moduleTemplateManageTableData
  }
}
