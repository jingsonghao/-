/**
 * @描述  赋码审批管理
 * @作者 Guo Ze Qiang
 * @日期 2017-11-22
 */
import Api from '@/ipt-coding-system/api'
import * as types from '../mutation-types'

const moduleApprovalManageTableData = {
  state: {
    approvalManageTableData: {}
  },
  getters: {
    approvalManageTableData: state => state.approvalManageTableData
  },
  actions: {
    getApprovalManageTableData({commit}, params) {
      Api.ApprovalManage.getApprovalManageTableData(params).then((approvalManageTableData) => {
        commit(types.GET_APPROVAL_MANAGE_TABLE_DATA, {approvalManageTableData})
      })
    }
  },
  mutations: {
    [types.GET_APPROVAL_MANAGE_TABLE_DATA](state, {approvalManageTableData}) {
      let enterpriseType = approvalManageTableData.data.enterpriseType
      let reviewStatus = approvalManageTableData.data.reviewStatus
      let pageList = approvalManageTableData.data.list
      for (let i = 0; i < pageList.content.length; i++) {
        for (let j = 0; j < enterpriseType.length; j++) {
          if (pageList.content[i].enterpriseType === parseInt(enterpriseType[j].value)) {
            pageList.content[i].enterpriseTypeName = enterpriseType[j].name
          }
        }
        for (let k = 0; k < reviewStatus.length; k++) {
          if (pageList.content[i].reviewStatus === parseInt(reviewStatus[k].value)) {
            pageList.content[i].reviewStatusName = reviewStatus[k].name
          }
        }
        if (pageList.content[i].reviewUser === null) {
          pageList.content[i].reviewUser = { name: "" }
        }
      }
      let pageData = {
        data: pageList.content,
        currentPage: pageList.number + 1,
        totalRecords: pageList.totalElements,
        totalPages: pageList.totalPages,
        newsEnums: {
          enterpriseType: enterpriseType,
          reviewStatus: reviewStatus
        }
      }
      state.approvalManageTableData = pageData
    }
  }
}
export default {
  modules: {
    moduleApprovalManageTableData
  }
}
