import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleChannelManageTableData = {
  state: {
    channelManageTableData: {}
  },
  getters: {
    channelManageTableData: state => state.channelManageTableData
  },
  actions: {
    getChannelManageTableData({commit}, params) {
      Api.ChannelManage.findPage(params).then((channelManageTableData) => {
        commit(types.GET_CHANNEL_MANAGE_TABLE_DATA, {channelManageTableData})
      })
    }
  },
  mutations: {
    [types.GET_CHANNEL_MANAGE_TABLE_DATA](state, {channelManageTableData}) {
      state.channelManageTableData = channelManageTableData
    }
  }
}

export default {
  modules: {
    moduleChannelManageTableData
  }
}
