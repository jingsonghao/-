import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleLeaveMessageTableData = {
  state: {
    notDealMessageTableData: {},
    haveDealMessageTableData: {}
  },
  getters: {
    notDealMessageTableData: state => state.notDealMessageTableData,
    haveDealMessageTableData: state => state.haveDealMessageTableData
  },
  actions: {
    getNotDealMessageTableData({commit}, params) {
      Api.LeaveMessage.getNotDealMessageTableData(params).then((notDealMessageTableData) => {
        commit(types.GET_LEAVE_MESSAGE_NOT_DEAL_TABLE_DATA, {notDealMessageTableData})
      })
    },
    getHaveDealMessageTableData({commit}, params) {
      Api.LeaveMessage.getNotDealMessageTableData(params).then((haveDealMessageTableData) => {
        commit(types.GET_LEAVE_MESSAGE_HAVE_DEAL_TABLE_DATA, {haveDealMessageTableData})
      })
    }
  },
  mutations: {
    [types.GET_LEAVE_MESSAGE_NOT_DEAL_TABLE_DATA](state, {notDealMessageTableData}) {
      let messageType = notDealMessageTableData.data.MessageTypeEnum
      let reviewStatus = notDealMessageTableData.data.ReviewStatusEnum
      let pageList = notDealMessageTableData.data.list
      for (let i = 0; i < pageList.content.length; i++) {
        for (let j = 0; j < messageType.length; j++) {
          if (pageList.content[i].messageType === parseInt(messageType[j].value)) {
            pageList.content[i].messageTypeName = messageType[j].name
            break
          }
        }
        for (let k = 0; k < reviewStatus.length; k++) {
          if (pageList.content[i].reviewStatus === parseInt(reviewStatus[k].value)) {
            pageList.content[i].reviewStatusName = reviewStatus[k].name
            break
          }
        }
      }
      let pageData = {
        data: pageList.content,
        currentPage: pageList.number + 1,
        totalRecords: pageList.totalElements,
        totalPages: pageList.totalPages,
        messageType: messageType,
        reviewStatus: reviewStatus
      }
      state.notDealMessageTableData = pageData
    },
    [types.GET_LEAVE_MESSAGE_HAVE_DEAL_TABLE_DATA](state, {haveDealMessageTableData}) {
      let messageType = haveDealMessageTableData.data.MessageTypeEnum
      let reviewStatus = haveDealMessageTableData.data.ReviewStatusEnum
      let pageList = haveDealMessageTableData.data.list
      for (let i = 0; i < pageList.content.length; i++) {
        for (let j = 0; j < messageType.length; j++) {
          if (pageList.content[i].messageType === parseInt(messageType[j].value)) {
            pageList.content[i].messageTypeName = messageType[j].name
            break
          }
        }
        for (let k = 0; k < reviewStatus.length; k++) {
          if (pageList.content[i].reviewStatus === parseInt(reviewStatus[k].value)) {
            pageList.content[i].reviewStatusName = reviewStatus[k].name
            break
          }
        }
      }
      let pageData = {
        data: pageList.content,
        currentPage: pageList.number + 1,
        totalRecords: pageList.totalElements,
        totalPages: pageList.totalPages,
        messageType: messageType,
        reviewStatus: reviewStatus
      }

      state.haveDealMessageTableData = pageData
    }
  }
}
export default {
  modules: {
    moduleLeaveMessageTableData
  }
}
