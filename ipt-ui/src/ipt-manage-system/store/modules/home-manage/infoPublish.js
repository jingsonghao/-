import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleInfoPublishTableData = {
  state: {
    infoPublishTableData: {
      newsEnums: {
        channel: []
      }
    }
  },
  getters: {
    infoPublishTableData: state => state.infoPublishTableData
  },
  actions: {
    getInfoPublishTableData({commit}, params) {
      Api.InfoPublish.getInfoPublishTableData(params).then((infoPublishTableData) => {
        commit(types.GET_INFO_PUBLISH_TABLE_DATA, {infoPublishTableData})
      })
    }
  },
  mutations: {
    [types.GET_INFO_PUBLISH_TABLE_DATA](state, {infoPublishTableData}) {
      let channel = infoPublishTableData.data.channel
      let reviewStatus = infoPublishTableData.data.reviewStatus
      let isTop = infoPublishTableData.data.isTop
      let pageList = infoPublishTableData.data.list
      for (let i = 0; i < pageList.content.length; i++) {
        for (let j = 0; j < channel.length; j++) {
          if (pageList.content[i].channel === parseInt(channel[j].value)) {
            pageList.content[i].channelName = channel[j].name
          }
        }
        for (let k = 0; k < reviewStatus.length; k++) {
          if (pageList.content[i].reviewStatus === parseInt(reviewStatus[k].value)) {
            pageList.content[i].reviewStatusName = reviewStatus[k].name
          }
        }
        for (let l = 0; l < isTop.length; l++) {
          if (pageList.content[i].isTop === parseInt(isTop[l].value)) {
            pageList.content[i].isTopName = isTop[l].name
          }
        }
        if (pageList.content[i].createUser === null) {
          pageList.content[i].createUser = {name: ""}
        }
        if (pageList.content[i].reviewUser === null) {
          pageList.content[i].reviewUser = {name: ""}
        }
      }
      let pageData = {
        data: pageList.content,
        currentPage: pageList.number + 1,
        totalRecords: pageList.totalElements,
        totalPages: pageList.totalPages,
        newsEnums: {
          channel: channel,
          reviewStatus: reviewStatus,
          isTop: isTop
        }
      }
      state.infoPublishTableData = pageData
    }
  }
}
export default {
  modules: {
    moduleInfoPublishTableData
  }
}
